import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { RootStackParams } from 'recipebase/src/RootNavigation';
import init from 'recipebase/src/store/Initalize';
import { SmallTagList } from 'recipebase/src/views/HomeNavigationView/HomeView/SmallTagList';
import { IngredientList } from './IngredientList';
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
    MenuIconWrapper,
    MenuIcon,
} from './RecipeView.styles';
import { getKey, StepsList } from './StepsList';

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
    const [currentSection, setCurrentSection] = useState<number>(0);
    const [currentStep, setCurrentStep] = useState<number | null>(null);
    const [ingredientMultiplier, setIngredientMultiplier] = useState(1);
    const [isMultiplierPickerOpen, setIsMultiplierPickerOpen] = useState(false);
    const [dropdownItems, setDropdownItems] = useState(initialDropdownItems);
    const [stepsCoords, setStepsCoords] = useState<Record<string, number>>({});
    const [topContentHeight, setTopContentHeight] = useState<number>(0);
    const scrollContainerRef = useRef<ScrollView>(null);

    useEffect(() => {
        init.recipes?.fetchRecipeById(route.params.recipeId);
    }, [route.params.recipeId]);

    if (!init.recipes?.currentRecipe || init.recipes.isFetchingCurrentRecipe) {
        return (
            <ScrollWrapper>
                <ActivityIndicator color="#777" size={60} />
            </ScrollWrapper>
        );
    }

    const nextStep = () => {
        setCurrentStep(step => {
            let next = (step === null ? 0 : step + 1);

            if (next === (init.recipes?.currentRecipe?.sections?.[currentSection]?.recipeSteps?.length)) {
                next = 0;
                setCurrentSection(section => {
                    if ((section + 1) === init.recipes?.currentRecipe?.sections?.length)
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
                const prevSectionLength = init.recipes?.currentRecipe?.sections?.[currentSection - 1]?.recipeSteps?.length ?? 0;
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
        const sectionCount = init.recipes?.currentRecipe?.sections?.length ?? 0;

        if (currentSection + 1 < sectionCount)
            return false;

        const lastSection = init.recipes?.currentRecipe?.sections?.[sectionCount - 1];

        return (lastSection?.recipeSteps?.length ?? 0) - 1 === currentStep;
    };

    return (
        <Wrapper>
            <ScrollWrapper ref={scrollContainerRef as any}>
                <Background source={{ uri: `data:image/jpeg;base64,${init.recipes.currentRecipe.coverImage}` }}>
                    <BackIconWrapper onPress={() => navigation.goBack()}>
                        <BackIcon />
                    </BackIconWrapper>
                    <MenuIconWrapper onPress={() => {}}>
                        <MenuIcon />
                    </MenuIconWrapper>
                </Background>
                <Content>
                    <View onLayout={e => setTopContentHeight(e.nativeEvent.layout.height)}>
                        <RecipeName>{init.recipes.currentRecipe.name}</RecipeName>
                        <SmallTagList recipe={init.recipes.currentRecipe} noHighlightSelected />
                        <Description>{init.recipes.currentRecipe.description}</Description>
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
                        onChildrenLaout={(e, key) => {
                            stepsCoords[key] = e.nativeEvent.layout.y;
                            setStepsCoords(stepsCoords);
                        }}
                    />
                </Content>
            </ScrollWrapper>
            {init.recipes.currentRecipe.sections?.find(s => (s.recipeSteps?.length ?? 0) > 0) && (
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
