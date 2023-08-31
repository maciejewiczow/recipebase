import React from 'react';
import { useRootStore } from '~/RootStoreContext';
import { RecipeSection, RecipeStep } from 'backend-logic';
import { AddSectionButton, DraggableList, NestableScrollableStepWrapper, StepHeaderWithMargin } from '../common.styles';
import { observer } from 'mobx-react-lite';
import { RecipeSectionHeaderWithMargin } from './Steps.styles';
import { AddStepButton } from './AddStepButton';
import { renderItem } from './RecipeStepView';

export type ItemType = RecipeStep | RecipeSection;

const sectionsToItems = (sections: RecipeSection[]): ItemType[] => {
    if (sections.length <= 1) {
        return sections[0].recipeSteps?.map<ItemType>(rs => {
            if (!rs.recipeSection)
                [rs.recipeSection] = sections;

            return rs;
        }) ?? [];
    }

    return sections.flatMap<ItemType>((section, index) => ([
        ...(index !== 0 ? [section] : []),
        ...(
            section.recipeSteps?.map<ItemType>(rs => {
                if (!rs.recipeSection)
                    rs.recipeSection = section;

                return rs;
            }) ?? []
        ),
    ]));
};

export const Steps: React.FC = observer(() => {
    const { draftRecipe } = useRootStore();

    const data = sectionsToItems(draftRecipe.recipe.sections ?? []);

    const hasMoreThanOneSection = (draftRecipe.recipe.sections?.length ?? 0) > 1;

    const lastSectionId = draftRecipe.recipe.sections?.at(-1)?.id;

    return (
        <NestableScrollableStepWrapper>
            <StepHeaderWithMargin>Recipe steps</StepHeaderWithMargin>
            {hasMoreThanOneSection && (
                <RecipeSectionHeaderWithMargin
                    section={draftRecipe.recipe.sections?.[0]}
                />
            )}
            <DraggableList<ItemType>
                data={data}
                keyExtractor={item => (
                    item instanceof RecipeStep
                        ? item.id.toString() + '-' + item.recipeSection?.id.toString() :
                        item.id.toString()
                )}
                renderItem={renderItem}
                onDragEnd={({ data: sections }) => (
                    draftRecipe.setRecipeSectionsFromArray(sections)
                )}
            />
            {lastSectionId && (
                <AddStepButton targetSectionId={lastSectionId} />
            )}
            <AddSectionButton
                onPress={draftRecipe.addNewSection}
            >
                Add section
            </AddSectionButton>
        </NestableScrollableStepWrapper>
    );
});

