import React from 'react';
import { RecipeSection, RecipeStep } from 'backend-logic';
import { observer } from 'mobx-react-lite';
import { GradientBackground } from '~/components/GradientBackground';
import { useRootStore } from '~/RootStoreContext';
import { AddStepButton } from './AddStepButton';
import { renderItem } from './RecipeStepView';
import {
    AddSectionButton,
    AddSectionButtonWrapper,
    DraggableList,
    NestableScrollableStepWrapper,
    StepHeaderText,
    StepHeaderWrapperWithMargin,
} from '../common.styles';
import { FirstRecipeSectionHeader } from './Steps.styles';

export type ItemType = RecipeStep | RecipeSection;

const sectionsToItems = (sections: RecipeSection[]): ItemType[] => {
    if (sections.length <= 1) {
        return (
            sections[0].recipeSteps?.map<ItemType>(rs => {
                if (!rs.recipeSection || rs.recipeSection.id !== sections[0].id) {
                    // eslint-disable-next-line prefer-destructuring
                    rs.recipeSection = sections[0];
                }

                return rs;
            }) ?? []
        );
    }

    return sections.flatMap<ItemType>((section, index) => [
        ...(index !== 0 ? [section] : []),
        ...(section.recipeSteps?.map<ItemType>(rs => {
            if (!rs.recipeSection || rs.recipeSection.id !== section.id) {
                rs.recipeSection = section;
            }

            return rs;
        }) ?? []),
    ]);
};

export const Steps: React.FC = observer(() => {
    const { draftRecipe } = useRootStore();

    const data = sectionsToItems(draftRecipe.recipe.sections ?? []);

    const hasMoreThanOneSection = (draftRecipe.recipe.sections?.length ?? 0) > 1;

    const lastSectionId = draftRecipe.recipe.sections?.at(-1)?.id;

    return (
        <GradientBackground>
            <NestableScrollableStepWrapper>
                <StepHeaderWrapperWithMargin>
                    <StepHeaderText>Method</StepHeaderText>
                </StepHeaderWrapperWithMargin>
                {hasMoreThanOneSection && (
                    <FirstRecipeSectionHeader section={draftRecipe.recipe.sections?.[0]} />
                )}
                <DraggableList<ItemType>
                    // @ts-expect-error shenanigans with typing generic components and styled stuff
                    hasMoreThanOneSection={hasMoreThanOneSection}
                    data={data}
                    // prettier-ignore
                    keyExtractor={item =>
                        (item instanceof RecipeStep
                            ? item.id.toString() + '-' + item.recipeSection?.id.toString()
                            : item.id.toString())
                    }
                    renderItem={renderItem}
                    onDragEnd={({ data: sections }) => draftRecipe.setRecipeSectionsFromArray(sections)}
                />
                {lastSectionId && <AddStepButton targetSectionId={lastSectionId} />}
                <AddSectionButtonWrapper>
                    <AddSectionButton onPress={draftRecipe.addNewSection}>Add section</AddSectionButton>
                </AddSectionButtonWrapper>
            </NestableScrollableStepWrapper>
        </GradientBackground>
    );
});
