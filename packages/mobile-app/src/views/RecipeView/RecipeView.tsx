import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, View } from 'react-native';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { useRootStore } from '~/RootStoreContext';
import { RootStackParams } from '~/RootNavigation';
import { SmallTagList } from '~/views/HomeNavigationView/HomeView/SmallTagList';
import { IngredientList } from './IngredientList';
import { getKey, StepsList } from './StepsList';
import {
    ScrollWrapper,
    Background,
    Content,
    RecipeName,
    BottomBar,
    LeftButton,
    RightButton,
    SubHeaderText,
    IngredientsHeader,
    IngredientMultiplierPicker,
    StepsHeaderText,
    Wrapper,
    Description,
    BackIcon,
    BackIconWrapper,
    MenuWrapper,
    MenuIcon,
    Text,
    MenuItemWrapper,
} from './RecipeView.styles';

interface MultiplierDropdownItem {
    label: string;
    value: number | string;
}

const initialDropdownItems: MultiplierDropdownItem[] = [
    ...new Array(2 / 0.25).fill(0).map((_, i) => ({
        label: `x${(i + 1) * 0.25}`,
        value: (i + 1) * 0.25,
    })),
    ...new Array(8).fill(0).map((_, i) => ({
        label: `x${i + 3}`,
        value: i + 3,
    })),
];

const additionalScrollOffset = 100;

export const RecipeView: React.FC<NativeStackScreenProps<RootStackParams, 'Recipe'>> = observer(({ route, navigation }) => {
    const { currentRecipe, recipes, tags } = useRootStore();
    const [currentSection, setCurrentSection] = useState<number>(0);
    const [currentStep, setCurrentStep] = useState<number | null>(null);
    const [ingredientMultiplier, setIngredientMultiplier] = useState(1);
    const [isMultiplierPickerOpen, setIsMultiplierPickerOpen] = useState(false);
    const [dropdownItems, setDropdownItems] = useState(initialDropdownItems);
    const [stepsCoords, setStepsCoords] = useState<Record<string, number>>({});
    const [topContentHeight, setTopContentHeight] = useState<number>(0);
    const scrollContainerRef = useRef<ScrollView>(null);

    useEffect(() => {
        const promise = currentRecipe.fetchRecipeById(route.params.recipeId);

        return () => promise.cancel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route.params.recipeId]);

    const nextStep = () => {
        setCurrentStep(step => {
            let next = (step === null ? 0 : step + 1);

            if (next === (currentRecipe.recipe?.sections?.[currentSection]?.recipeSteps?.length)) {
                next = 0;
                setCurrentSection(section => {
                    if ((section + 1) === currentRecipe.recipe?.sections?.length)
                        return section;

                    return section + 1;
                });
            }

            return next;
        });

        scrollContainerRef.current?.scrollTo({
            y: stepsCoords[getKey(currentStep ?? 0, currentSection)] + topContentHeight + additionalScrollOffset,
            animated: true,
        });
    };

    const prevStep = () => {
        setCurrentStep(step => {
            if (step === 0) {
                const prevSectionLength = currentRecipe.recipe?.sections?.[currentSection - 1]?.recipeSteps?.length ?? 0;
                const next = prevSectionLength - 1;
                setCurrentSection(section => section - 1);
                return next;
            }

            return (step !== null ? step - 1 : null);
        });
        scrollContainerRef.current?.scrollTo({
            y: stepsCoords[getKey(currentStep ?? 0, currentSection)] + topContentHeight - additionalScrollOffset,
            animated: true,
        });
    };

    const isLastStep = () => {
        const sectionCount = currentRecipe.recipe?.sections?.length ?? 0;

        if (currentSection + 1 < sectionCount)
            return false;

        const lastSection = currentRecipe.recipe?.sections?.[sectionCount - 1];

        return (lastSection?.recipeSteps?.length ?? 0) - 1 === currentStep;
    };

    const editCurrentRecipe = () => {
        // TODO: Edit recipe
        // currentRecipe.makeCurrentRecipeEditable();
        // tags.copyRecipeTagsToDraftTags(currentRecipe.currentRecipe);
        // navigation.navigate('HomeTabNavigator', { screen: 'Create', params: { isEdit: true } });
    };

    const deleteCurrentRecipe = () => {
        Alert.alert(
            'Are you sure?',
            'The deleted recipes list can be found in the settings',
            [
                {
                    text: 'Ok',
                    onPress: () => {
                        const removedRecipeId = currentRecipe.delete();

                        if (removedRecipeId)
                            recipes.removeRecipe(removedRecipeId);

                        navigation.navigate('HomeTabNavigator', { screen: 'Home' });
                    },
                },
                {
                    text: 'Cancel',
                },
            ],
            { cancelable: true }
        );
    };

    if (!currentRecipe.recipe || currentRecipe.isFetchingCurrentRecipe) {
        return (
            <ScrollWrapper>
                <ActivityIndicator color="#777" size={60} />
            </ScrollWrapper>
        );
    }

    return (
        <Wrapper>
            <ScrollWrapper ref={scrollContainerRef as any}>
                <Background source={{ uri: `data:image/jpeg;base64,${currentRecipe.recipe.coverImage}` }}>
                    <BackIconWrapper onPress={() => navigation.goBack()}>
                        <BackIcon />
                    </BackIconWrapper>
                    <MenuWrapper>
                        <Menu>
                            <MenuTrigger>
                                <MenuIcon />
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption onSelect={editCurrentRecipe}>
                                    <MenuItemWrapper>
                                        <Text>Edit</Text>
                                    </MenuItemWrapper>
                                </MenuOption>
                                <MenuOption onSelect={deleteCurrentRecipe}>
                                    <MenuItemWrapper>
                                        <Text>Delete</Text>
                                    </MenuItemWrapper>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </MenuWrapper>
                </Background>
                <Content>
                    <View onLayout={e => setTopContentHeight(e.nativeEvent.layout.height)}>
                        <RecipeName>{currentRecipe.recipe.name}</RecipeName>
                        <SmallTagList recipe={currentRecipe.recipe} noHighlightSelected />
                        <Description>{currentRecipe.recipe.description}</Description>
                        <IngredientsHeader>
                            <SubHeaderText>Ingredients</SubHeaderText>
                            <IngredientMultiplierPicker
                                open={isMultiplierPickerOpen}
                                setOpen={setIsMultiplierPickerOpen}
                                value={ingredientMultiplier}
                                setValue={setIngredientMultiplier}
                                items={dropdownItems}
                                setItems={setDropdownItems}
                                searchPlaceholder="Custom"
                                listMode="SCROLLVIEW"
                                addCustomItem
                                searchable
                            />
                        </IngredientsHeader>
                        <IngredientList multiplier={ingredientMultiplier} />
                        <StepsHeaderText>Steps</StepsHeaderText>
                    </View>
                    <StepsList
                        currentStep={currentStep ?? -1}
                        currentSection={currentSection}
                        onChildrenLayout={(e, key) => {
                            stepsCoords[key] = e.nativeEvent.layout.y;
                            setStepsCoords(stepsCoords);
                        }}
                    />
                </Content>
            </ScrollWrapper>
            {currentRecipe.recipe.sections?.find(s => (s.recipeSteps?.length ?? 0) > 0) && (
                <BottomBar>
                    {currentStep !== null && (
                        <LeftButton
                            disabled={currentStep === 0 && currentSection === 0}
                            onPress={prevStep}
                        >
                            <BackIcon />
                        </LeftButton>
                    )}
                    <RightButton
                        onPress={nextStep}
                        disabled={isLastStep()}
                    >
                        {currentStep === null ? 'Start' : (!isLastStep() ? 'Next step' : 'Done!')}
                    </RightButton>
                </BottomBar>
            )}
        </Wrapper>
    );
});
