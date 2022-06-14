import { observer } from 'mobx-react-lite';
import React from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { useRootStore } from 'recipebase/src/RootStoreContext';
import { RecipeProgression, RecipeStepLineDecorator } from './RecipeStepLineDecorator';
import { SectionTitle, RecipeStepRow, RecipeStepText, Text } from './RecipeView.styles';

export interface StepsListProps {
    currentStep: number;
    currentSection: number;
    onChildrenLaout?: (e: LayoutChangeEvent, childKey: string) => any;
}

export const getKey = (item: number, section: number) => `${section}_${item}`;

const getProgression = (currentSection: number, currentStep: number, i: number, si: number) => {
    if (currentSection < si)
        return RecipeProgression.future;

    if (currentSection > si)
        return RecipeProgression.past;

    if ((currentStep ?? -1) < i)
        return RecipeProgression.future;

    if ((currentStep ?? -1) > i)
        return RecipeProgression.past;

    return RecipeProgression.current;
};

export const StepsList: React.FC<StepsListProps> = observer(({ currentStep, currentSection, onChildrenLaout }) => {
    const root = useRootStore();

    if (!root.recipes?.currentRecipe)
        return null;

    if ((root.recipes.currentRecipe.sections?.length ?? 0) === 0)
        return <Text>No steps to show</Text>;

    return (
        <View>{
            root.recipes.currentRecipe.sections?.flatMap((section, si) => ([
                (root.recipes?.currentRecipe?.sections?.length ?? 0) > 1 && section.name && (
                    <SectionTitle isFirstChild={si === 0} key={section.id}>{section.name}</SectionTitle>
                ),
                ...(section.recipeSteps?.map((step, i) => (
                    <RecipeStepRow onLayout={e => onChildrenLaout?.(e, getKey(i, si))} key={getKey(step.id, section.id)}>
                        <RecipeStepLineDecorator
                            progression={getProgression(currentSection, currentStep, i, si)}
                            isLast={i === (section.recipeSteps?.length ?? 1) - 1}
                        />
                        <RecipeStepText
                            isCurrent={currentStep === i && currentSection === si}
                        >
                            {step.content}
                        </RecipeStepText>
                    </RecipeStepRow>
                )) ?? []),
            ]))
        }</View>
    );
});
