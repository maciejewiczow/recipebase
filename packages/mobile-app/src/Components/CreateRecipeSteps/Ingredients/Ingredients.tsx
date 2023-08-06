import React from 'react';
import { useRootStore } from '~/RootStoreContext';
import { renderItem } from './RecipeIngredientView';
import { IngredientSection, RecipeIngredient } from 'backend-logic';
import { observer } from 'mobx-react-lite';
import {
    AddSectionButton,
    IngredientList,
    ScrollableStepWrapper,
    SectionHeaderWithMargin,
    StepHeader,
} from './Ingredients.styles';
import { AddIngredientButton } from './AddIngredientButton';

export type ItemType = RecipeIngredient | IngredientSection;

const sectionsToItems = (sections: IngredientSection[]): ItemType[] => {
    if (sections.length <= 1) {
        return sections[0].recipeIngredients?.map<ItemType>(ri => {
            [ri.ingredientSection] = sections;

            return ri;
        }) ?? [];
    }

    return sections.flatMap<ItemType>((section, index) => ([
        ...(index !== 0 ? [section] : []),
        ...(
            section.recipeIngredients?.map<ItemType>(ri => {
                ri.ingredientSection = section;

                return ri;
            }) ?? []
        ),
    ]));
};

export const Ingredients: React.FC = observer(() => {
    const { draftRecipe } = useRootStore();

    const data = sectionsToItems(draftRecipe.recipe.ingredientSections ?? []);

    const hasMoreThanOneSection = (draftRecipe.recipe.ingredientSections?.length ?? 0) > 1;

    const lastRecipeSectionId = draftRecipe.recipe.ingredientSections?.at(-1)?.id;

    return (
        <ScrollableStepWrapper>
            <StepHeader>Ingredients</StepHeader>
            {hasMoreThanOneSection && (
                <SectionHeaderWithMargin
                    section={draftRecipe.recipe.ingredientSections?.[0]}
                />
            )}
            <IngredientList<ItemType>
                data={data}
                keyExtractor={item => (
                    item instanceof RecipeIngredient
                        ? item.id.toString() + '-' + item.ingredientSection?.id.toString() :
                        item.id.toString()
                )}
                renderItem={renderItem}
                onDragEnd={({ data: sections }) => (
                    draftRecipe.setIngredientSectionsFromArray(sections)
                )}
            />
            {lastRecipeSectionId && (
                <AddIngredientButton targetSectionId={lastRecipeSectionId} />
            )}
            <AddSectionButton
                onPress={draftRecipe.addNewIngredientSection}
            >
                Add section
            </AddSectionButton>
        </ScrollableStepWrapper>
    );
});

Ingredients.displayName = 'Ingredients';

