import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, TouchableOpacity } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import ImageResizer, { Response as ResizeResponse } from '@bam.tech/react-native-image-resizer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
    DraftRecipe,
    Ingredient,
    Ingredients,
    IngredientSection,
    RecipeIngredient,
    RecipeStep,
    Unit,
    Units,
} from 'backend-logic';
import { components } from '~/api/types.generated';
import { BottomSheetSelect, DefaultItem } from '~/components/BottomSheetSelect/BottomSheetSelect';
import { Checkbox } from '~/components/Checkbox';
import { StepHeaderBackIconWrapper, StepHeaderText } from '~/components/CreateRecipeSteps/common.styles';
import { Input } from '~/components/Input';
import { BackIconSvg } from '~/components/Svg/BackIconSvg';
import { RootStackParams } from '~/RootNavigation';
import { useRootStore } from '~/RootStoreContext';
import { useSecureStorageValue } from '~/utils/useSecureStorageValue';
import { getIngredientsWithDrafts, getUnitsWithDrafts } from '../AddIngredientView/hooks';
import {
    CheckboxLabel,
    CheckboxPressable,
    CheckboxRow,
    ImportButton,
    MainErrorText,
    MainErrorWrapper,
    MoreInfoIcon,
    OuterWrapper,
    StepHeaderWrapper,
    Wrapper,
} from './ImportRecipeView.styles';

type ImportRecipeViewProps = NativeStackScreenProps<RootStackParams, 'ImportRecipeView'>;

const supportedContentTypes = ['image/jpeg', 'image/png', 'image/webp'];

const getImageDimensions = (path: string) =>
    new Promise<{ width: number; height: number }>((resolve, reject) => {
        Image.getSize(path, (width, height) => resolve({ width, height }), reject);
    });

const downloadCoverImageToBase64 = async (imageUrl: string): Promise<string> => {
    const { headers, status } = await fetch(imageUrl, { method: 'HEAD' });

    if (status !== 200) {
        throw new Error("Couldn't dowload the cover image for recipe.");
    }

    const contentType = headers.get('Content-Type');

    if (!supportedContentTypes.includes(contentType ?? '')) {
        throw new Error(`Unsupported cover image format (${contentType})`);
    }

    const contentLenght = headers.get('Content-Length');
    const shouldCompressImage = !contentLenght || +contentLenght >= 2_000_000; // 2 Mb

    const fileResult = await ReactNativeBlobUtil.config({
        fileCache: shouldCompressImage,
    }).fetch('GET', imageUrl);

    let resizeResult: ResizeResponse | undefined = undefined;
    try {
        if (!shouldCompressImage) {
            return `data:${contentType};base64,${await fileResult.base64()}`;
        }

        const { width, height } = await getImageDimensions(
            `${Platform.OS === 'android' ? 'file://' : ''}${fileResult.path()}`,
        );

        const desiredWidth = 1200; // px
        resizeResult = await ImageResizer.createResizedImage(
            fileResult.path(),
            desiredWidth,
            desiredWidth * (height / width),
            'JPEG',
            80,
            0,
            null,
            false,
            {
                mode: 'cover',
                onlyScaleDown: true,
            },
        );

        const base64Content: string = await ReactNativeBlobUtil.fs.readFile(resizeResult.uri, 'base64');

        return `data:${contentType};base64,${base64Content}`;
    } finally {
        if (resizeResult) {
            await ReactNativeBlobUtil.fs.unlink(resizeResult.path);
        }
        fileResult.flush();
    }
};

async function findOrCreateUnit(
    ingredientSections: IngredientSection[] | undefined,
    unitsStore: Units,
    apiIngredient: components['schemas']['Ingredient'],
) {
    if (apiIngredient.quantity === null && apiIngredient.unit === null) {
        return undefined;
    }

    const apiUnitName = apiIngredient.unit === null ? 'szt' : apiIngredient.unit;

    await unitsStore.fetchUnits(apiUnitName);

    const unitsWithDrafts = getUnitsWithDrafts(ingredientSections, unitsStore.units);

    let unit = unitsWithDrafts.find(
        u => u.name.trim().toLowerCase() === apiIngredient.unit?.trim().toLowerCase(),
    );

    if (!unit) {
        unit = Unit.createWithTemporaryId();
        unit.name = apiUnitName;
    }

    return unit;
}

async function findOrCreateIngredient(
    ingredientSections: IngredientSection[] | undefined,
    ingredientsStore: Ingredients,
    apiIngredient: components['schemas']['Ingredient'],
) {
    await ingredientsStore.fetchIngredients(apiIngredient.name);

    let ingredient = getIngredientsWithDrafts(ingredientSections, ingredientsStore.ingredients).find(
        i => i.name.trim().toLowerCase() === apiIngredient.name.trim().toLowerCase(),
    );

    if (!ingredient) {
        ingredient = Ingredient.createWithTemporaryId();
        ingredient.name = apiIngredient.name.trim();
    }

    return ingredient;
}

const setRecipeFromApiResponse = async (
    draftRecipe: DraftRecipe,
    unitsStore: Units,
    ingredientsStore: Ingredients,
    apiResponse: components['schemas']['Recipe'],
) => {
    draftRecipe.clear();
    draftRecipe.setName(apiResponse.title);
    draftRecipe.setDescription(apiResponse.description ?? '');
    draftRecipe.setSource(apiResponse.url);

    if (apiResponse.imageUrl) {
        draftRecipe.setCoverImage(await downloadCoverImageToBase64(apiResponse.imageUrl));
    }

    let firstSectionId = draftRecipe.recipe.sections?.[0].id;

    if (!firstSectionId) {
        ({ id: firstSectionId } = draftRecipe.addNewSection());
    }

    for (const stepContent of apiResponse.steps) {
        const step = RecipeStep.createWithTemporaryId();
        step.content = stepContent;
        step.referencedIngredients = [];
        draftRecipe.addNewStep(firstSectionId, step);
    }

    if (draftRecipe.recipe.ingredientSections?.[0]) {
        draftRecipe.removeIngredientSection(draftRecipe.recipe.ingredientSections[0].id);
    }

    for (const { name, ingredients } of apiResponse.ingredientGroups) {
        const { id } = draftRecipe.addNewIngredientSection();

        draftRecipe.setSectionName(id, name);

        for (const apiIngredient of ingredients) {
            const [unit, ingredient] = await Promise.all([
                findOrCreateUnit(draftRecipe.recipe.ingredientSections, unitsStore, apiIngredient),
                findOrCreateIngredient(
                    draftRecipe.recipe.ingredientSections,
                    ingredientsStore,
                    apiIngredient,
                ),
            ]);

            const ri = RecipeIngredient.createFromApiData(ingredient, unit, apiIngredient.quantity);

            draftRecipe.addNewRecipeIngredient(id, ri);
        }
    }
};

export const ImportRecipeView: React.FC<ImportRecipeViewProps> = ({ navigation }) => {
    const { draftRecipe, units, ingredients } = useRootStore();
    const [isLoading, setIsLoading] = useState(false);
    const [mainErrorText, setMainErrorText] = useState('');
    const [recipeUrl, setRecipeUrl] = useState('');
    const [apiKey, setApiKey, persistApiKey] = useSecureStorageValue('api_key', '');
    const [useIngredientParsing, setUseIngredientParsing] = useState(false);
    const [language, setLanguage] = useState<DefaultItem>({ label: 'Polish', value: 'pl' });

    useEffect(() => {
        setUseIngredientParsing(!!apiKey);
    }, [apiKey]);

    const openApiKeyMoreInfoPopup = () => {
        Alert.alert(
            'What is this?',
            'Api key is required when you want to parse the ingredients, as it uses non-free ChatGPT API to do so. To obtain the api key, contact me at maciej.adamus00@gmail.com',
        );
    };

    const openParsingMoreInfoPopup = () => {
        Alert.alert(
            'What is this?',
            'When this is enabled, the app will try to parse out ingredient, quantity and unit from the recipe ingredients using ChatGPT.\nWhen unchecked, the ingredient text will be put in the ingredient name field verbatim. Quantity and unit will need to be extracted manually.',
        );
    };

    const openLanguageMoreInfoPopup = () => {
        Alert.alert(
            'What is this?',
            'This is the language of the recipe that will be assumed if the parser fails to detect it automatically.',
        );
    };

    const tryParseRecipe = async () => {
        try {
            setIsLoading(true);
            setMainErrorText('');
            // const { data, error, response } = await client.GET('/recipe', {
            //     params: {
            //         query: {
            //             url: recipeUrl,
            //             defaultToLang: language.value,
            //             parseIngredients: useIngredientParsing,
            //         },
            //         // @ts-expect-error the type generator does not support authentication apparently
            //         header: useIngredientParsing
            //             ? {
            //                   'X-api-key': apiKey,
            //               }
            //             : undefined,
            //     },
            // });

            // if (error || !data) {
            //     if (response.status === 400 || response.status === 500) {
            //         setMainErrorText('Something is broken. Please try again later');
            //     } else if (response.status === 422) {
            //         setMainErrorText('Unable to parse the recipe. Please try again');
            //     } else if (response.status === 401 || response.status === 403) {
            //         setMainErrorText('Invalid access token');
            //     }

            //     console.log(error, data, response.status);

            //     return;
            // }

            const data: components['schemas']['ScrapeRecipeResponse'] = {
                ingredientParseStatus: 'ok',
                recipe: {
                    category: null,
                    description: null,
                    imageUrl:
                        'https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/risotto_z_dynia02_0.jpg',
                    ingredientGroups: [
                        {
                            ingredients: [
                                {
                                    name: 'dynia obrana i pokrojona w 1 cm kosteczki',
                                    quantity: '1',
                                    unit: 'szklanka',
                                },
                                {
                                    name: 'mleko',
                                    quantity: '1',
                                    unit: 'szklanka',
                                },
                                {
                                    name: 'masło',
                                    quantity: '2',
                                    unit: 'łyżki',
                                },
                                {
                                    name: 'cebula szalotka',
                                    quantity: '1 mała (lub 1/4) ',
                                    unit: null,
                                },
                                {
                                    name: 'ryż do risotto, 1 filiżanka',
                                    quantity: '100',
                                    unit: 'g',
                                },
                                {
                                    name: 'wino białe',
                                    quantity: '1/4',
                                    unit: 'szklanka',
                                },
                                {
                                    name: 'bulion drobiowy',
                                    quantity: '0.5',
                                    unit: 'litr',
                                },
                                {
                                    name: 'gałka muszkatołowa',
                                    quantity: 'tarta',
                                    unit: null,
                                },
                                {
                                    name: 'Parmezan 1/2 filiżanki',
                                    quantity: '25',
                                    unit: 'g',
                                },
                            ],
                            name: null,
                        },
                    ],
                    lang: 'pl',
                    steps: [
                        'Dynię zalać mlekiem i moczyć przez 12 godzin, trzymając ją w lodówce (jeśli nie masz czasu, pomiń ten etap). Odcedzić przed przystąpieniem do gotowania risotto. Zagotować bulion i trzymać na małym ogniu.',
                        'Roztopić 2 łyżki masła na patelni, dodać pokrojoną w kosteczkę cebulę i połowę dyni. Smażyć na małym ogniu aż cebulka się zeszkli, ale nie będzie zrumieniona, przez około 5 minut. Dodać ryż, zwiększyć ogień do średniego i mieszając chwilę podsmażać aż pokryje się masłem. Wlać wino i odparować.',
                        'Zacząć stopniowo wlewać bulion, po jednej łyżce wazowej, za każdym razem mieszając. Kiedy ryż zaabsorbuje całkowicie jedną porcja bulionu, dodać kolejną. Gotować w ten sposób przez 15 - 17 minut, wlewając kolejne porcje bulionu i co chwilę mieszając. W połowie tego czasu dodać resztę dyni i doprawić risotto gałką muszkatołową.',
                        'Na koniec risotto nie powinno być zbyt suche ani za bardzo wodniste (może pozostać ci trochę bulionu). Ryż musi być al dente ale i jednocześnie miękki. Patelnię zdjąć z ognia i odczekać 1 minutę. Włożyć kawałki zimnego masła i wymieszać drewnianą łyżką. Na koniec połączyć z tartym Parmezanem. Doprawić solą oraz pieprzem.',
                    ],
                    title: 'Risotto z dynią',
                    url: 'https://www.kwestiasmaku.com/kuchnia_wloska/risotto_z_dynia/przepis.html',
                },
                wildModeUsed: false,
            };

            if (data.wildModeUsed) {
                Alert.alert(
                    'Wild mode was used',
                    'The app used a "free-hand" approach to parsing the recipe. Please review the recipe carefully before saving.',
                );
            }

            if (useIngredientParsing && data.ingredientParseStatus !== 'ok') {
                Alert.alert(
                    'Advanced recipe ingredient parsing failed',
                    "The advanced recipe ingredient parsing couldn't be applied. The ingrediends need to be parsed manually.",
                );
            }

            await setRecipeFromApiResponse(draftRecipe, units, ingredients, data.recipe);
            await persistApiKey();
            navigation.navigate('CreateRecipe', { screen: 'NameAndPhoto' });
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <OuterWrapper>
            <Wrapper>
                <StepHeaderWrapper>
                    <StepHeaderBackIconWrapper onPress={() => navigation.goBack()}>
                        <BackIconSvg />
                    </StepHeaderBackIconWrapper>
                    <StepHeaderText>Import recipe</StepHeaderText>
                </StepHeaderWrapper>
                <Input
                    label="Recipe URL"
                    textContentType="URL"
                    inputMode="url"
                    placeholder="Paste in a link to the recipe"
                    value={recipeUrl}
                    onChange={setRecipeUrl}
                />
                <BottomSheetSelect
                    label="Default recipe language"
                    value={language}
                    onChange={({ item }) => setLanguage(item)}
                    options={[
                        {
                            label: 'English',
                            value: 'en',
                        },
                        {
                            label: 'Polish',
                            value: 'pl',
                        },
                    ]}
                    iconRight={
                        <TouchableOpacity onPress={openLanguageMoreInfoPopup}>
                            <MoreInfoIcon />
                        </TouchableOpacity>
                    }
                />
                <CheckboxRow>
                    <CheckboxPressable onPress={() => setUseIngredientParsing(prev => !prev)}>
                        <Checkbox checked={useIngredientParsing} />
                        <CheckboxLabel>Try to parse the ingredients</CheckboxLabel>
                    </CheckboxPressable>
                    <TouchableOpacity onPress={openParsingMoreInfoPopup}>
                        <MoreInfoIcon />
                    </TouchableOpacity>
                </CheckboxRow>
                {useIngredientParsing && (
                    <Animated.View
                        entering={FadeIn}
                        exiting={FadeOut}
                    >
                        <Input
                            label="API Key"
                            rightIcon={
                                <TouchableOpacity onPress={openApiKeyMoreInfoPopup}>
                                    <MoreInfoIcon />
                                </TouchableOpacity>
                            }
                            textContentType="password"
                            secureTextEntry
                            onChange={setApiKey}
                            value={apiKey}
                        />
                    </Animated.View>
                )}
            </Wrapper>
            {mainErrorText && (
                <MainErrorWrapper>
                    <MainErrorText>{mainErrorText}</MainErrorText>
                </MainErrorWrapper>
            )}
            <ImportButton
                loading={isLoading}
                disabled={recipeUrl.length === 0}
                onPress={tryParseRecipe}
            >
                Import
            </ImportButton>
        </OuterWrapper>
    );
};
