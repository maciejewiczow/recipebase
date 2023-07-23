import React from 'react';
import { DeleteSectionIcon, RecipeSectionWrapper, SectionNameInput, SectionNameInputRow } from './Steps.styles';
import { useRootStore } from '~/RootStoreContext';
import { RecipeStep } from 'backend-logic';
import { AddSectionButton, ScrollableStepWrapper, SectionHeader } from '../common.styles';
import { RecipeStepView } from './RecipeStepView';
import { TouchableNativeFeedback } from 'react-native';
import { observer } from 'mobx-react-lite';

export const Steps: React.FC = observer(() => {
    const { recipes } = useRootStore();

    const addStep = (sectionId: number, recipeStep: RecipeStep) => () => {
        if (recipeStep.content)
            recipes.addNewDraftRecipeStep(sectionId);
    };

    const setStepContent = (sectionId: number, stepId: number) => (content: string) => {
        recipes.setDraftRecipeStepContent(sectionId, stepId, content);
    };

    const setStectionName = (sectionId: number) => (name: string) => {
        recipes.setDraftRecipeSectionName(sectionId, name);
    };

    const removeSection = (sectionId: number) => () => {
        recipes.removeDraftRecipeSection(sectionId);
    };

    return (
        <ScrollableStepWrapper>
            <SectionHeader>Recipe steps</SectionHeader>
            {recipes.draftRecipe.sections?.length === 1 ? (
                recipes.draftRecipe.sections[0].recipeSteps?.map((step, index) => {
                    const section = recipes.draftRecipe.sections?.[0];

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
                recipes.draftRecipe.sections?.map(section => (
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
                onPress={recipes.addNewDraftRecipeSection}
            >
                Add section
            </AddSectionButton>
        </ScrollableStepWrapper>
    );
});

