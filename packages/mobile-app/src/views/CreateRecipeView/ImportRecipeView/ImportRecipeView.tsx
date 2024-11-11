import React, { useState } from 'react';
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
import { client } from '~/api/client';
import { components } from '~/api/types.generated';
import { BottomSheetSelect, DefaultItem } from '~/components/BottomSheetSelect/BottomSheetSelect';
import { Checkbox } from '~/components/Checkbox';
import { Input } from '~/components/Input';
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
    Wrapper,
} from './ImportRecipeView.styles';

type ImportRecipeViewProps = NativeStackScreenProps<RootStackParams, 'ImportRecipeView'>;

const supportedContentTypes = ['image/jpeg', 'image/png'];

const getImageDimensions = (path: string) => new Promise<{ width: number; height: number }>((resolve, reject) => {
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
    const shouldStoreFileInCache = !contentLenght || +contentLenght >= 2_000_000; // 2 Mb

    const fileResult = await ReactNativeBlobUtil.config({
        fileCache: shouldStoreFileInCache,
    }).fetch('GET', imageUrl);

    let resizeResult: ResizeResponse | undefined = undefined;
    try {
        if (!shouldStoreFileInCache) {
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

        draftRecipe.setSectionName(id, name ?? '');

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
            const { data, error, response } = await client.GET('/recipe', {
                params: {
                    query: {
                        url: recipeUrl,
                        defaultToLang: language.value,
                        parseIngredients: useIngredientParsing,
                    },
                    // @ts-expect-error the type generator does not support authentication apparently
                    header: useIngredientParsing
                        ? {
                              'X-api-key': apiKey,
                          }
                        : undefined,
                },
            });

            if (error || !data) {
                if (response.status === 400 || response.status === 500) {
                    setMainErrorText('Something is broken. Please try again later');
                    return;
                }

                if (response.status === 422) {
                    setMainErrorText('Unable to parse the recipe. Please try again');
                    return;
                }

                if (response.status === 401 || response.status === 403) {
                    setMainErrorText('Invalid access token');
                    return;
                }

                return;
            }

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
