import React from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '~/RootStoreContext';
import { RecipeProgression, RecipeStepLineDecorator } from './RecipeStepLineDecorator';
import { RecipeStepRow, RecipeStepText, SectionTitle, Text } from './RecipeView.styles';

export interface StepsListProps {
    currentStep: number;
    currentSection: number;
    onChildrenLayout?: (e: LayoutChangeEvent, childKey: string) => void;
}

export const getKey = (item: number, section: number) => `${section}_${item}`;

const getProgression = (currentSection: number, currentStep: number, i: number, si: number) => {
    if (currentSection < si) {
        return RecipeProgression.future;
    }

    if (currentSection > si) {
        return RecipeProgression.past;
    }

    if (currentStep < i) {
        return RecipeProgression.future;
    }

    if (currentStep > i) {
        return RecipeProgression.past;
    }

    return RecipeProgression.current;
};

export const StepsList: React.FC<StepsListProps> = observer(
    ({ currentStep, currentSection, onChildrenLayout }) => {
        const { currentRecipe } = useRootStore();

        if (!currentRecipe.recipe) {
            return null;
        }

        if ((currentRecipe.recipe.sections?.length ?? 0) === 0) {
            return <Text>No steps to show</Text>;
        }

        return (
            <View>
                {currentRecipe.recipe.sections?.flatMap((section, sectionIndex) => [
                    (currentRecipe.recipe?.sections?.length ?? 0) > 1 && section.name && (
                        <SectionTitle
                            isFirstChild={sectionIndex === 0}
                            key={section.id}
                        >
                            {section.name}
                        </SectionTitle>
                    ),
                    ...(section.recipeSteps?.map((step, i) => (
                        <RecipeStepRow
                            onLayout={e => onChildrenLayout?.(e, getKey(i, sectionIndex))}
                            key={getKey(step.id, section.id)}
                        >
                            <RecipeStepLineDecorator
                                progression={getProgression(currentSection, currentStep, i, sectionIndex)}
                                isLast={i === (section.recipeSteps?.length ?? 1) - 1}
                            />
                            <RecipeStepText isCurrent={currentStep === i && currentSection === sectionIndex}>
                                {step.content}
                            </RecipeStepText>
                        </RecipeStepRow>
                    )) ?? []),
                ])}
            </View>
        );
    },
);
