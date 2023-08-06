import React from 'react';
import { DeleteSectionIcon, RecipeSectionWrapper, SectionNameInput, SectionNameInputRow } from './Steps.styles';
import { useRootStore } from '~/RootStoreContext';
import { RecipeStep } from 'backend-logic';
import { AddSectionButton, ScrollableStepWrapper, StepHeader } from '../common.styles';
import { RecipeStepView } from './RecipeStepView';
import { TouchableNativeFeedback } from 'react-native';
import { observer } from 'mobx-react-lite';

export const Steps: React.FC = observer(() => {
    const { draftRecipe } = useRootStore();

    const addStep = (sectionId: number, recipeStep: RecipeStep) => () => {
        if (recipeStep.content)
            draftRecipe.addNewStep(sectionId);
    };

    const setStepContent = (sectionId: number, stepId: number) => (content: string) => {
        draftRecipe.setStepContent(sectionId, stepId, content);
    };

    const setStectionName = (sectionId: number) => (name: string) => {
        draftRecipe.setSectionName(sectionId, name);
    };

    const removeSection = (sectionId: number) => () => {
        draftRecipe.removeSection(sectionId);
    };

    return (
        <ScrollableStepWrapper>
            <StepHeader>Recipe steps</StepHeader>
            {draftRecipe.recipe.sections?.length === 1 ? (
                draftRecipe.recipe.sections[0].recipeSteps?.map((step, index) => {
                    const section = draftRecipe.recipe.sections?.[0];

                    if (!section)
                        return null;

                    return (
                        <RecipeStepView
                            key={step.id}
                            isLast={index === (section.recipeSteps?.length ?? 0) - 1}
                            step={step}
                            addRecipeStep={addStep(section.id, step)}
                            setStepContent={setStepContent(section.id, step.id)}
                            noDragIcon
                        />
                    );
                })
            ) : (
                draftRecipe.recipe.sections?.map(section => (
                    <RecipeSectionWrapper key={section.id}>
                        <SectionNameInputRow>
                            <SectionNameInput
                                value={section.name ?? ''}
                                label="Section name"
                                onChange={setStectionName(section.id)}
                            />
                            <TouchableNativeFeedback
                                onPress={removeSection(section.id)}
                            >
                                <DeleteSectionIcon />
                            </TouchableNativeFeedback>
                        </SectionNameInputRow>
                        {section.recipeSteps?.map((step, index) => (
                            <RecipeStepView
                                key={step.id}
                                isLast={index === (section.recipeSteps?.length ?? 0) - 1}
                                step={step}
                                addRecipeStep={addStep(section.id, step)}
                                setStepContent={setStepContent(section.id, step.id)}
                                noDragIcon
                            />
                        ))}
                    </RecipeSectionWrapper>
                ))
            )}
            <AddSectionButton
                onPress={draftRecipe.addNewSection}
            >
                Add section
            </AddSectionButton>
        </ScrollableStepWrapper>
    );
});

