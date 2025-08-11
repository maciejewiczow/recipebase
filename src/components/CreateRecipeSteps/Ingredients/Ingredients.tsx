import React from 'react';
import { IngredientSection, RecipeIngredient } from 'backend-logic';
import { observer } from 'mobx-react-lite';
import { GradientBackground } from '~/components/GradientBackground';
import { useRootStore } from '~/RootStoreContext';
import { useIsKeyboardOpen } from '~/utils/useIsKeyoardOpen';
import { AddIngredientButton } from './AddIngredientButton';
import { renderItem } from './RecipeIngredientView';
import {
    AddSectionButton,
    AddSectionButtonWrapper,
    DraggableList,
    NestableScrollableStepWrapper,
    StepHeaderText,
    StepHeaderWrapperWithMargin,
} from '../common.styles';
import { FirstIngredientSectionHeader } from './Ingredients.styles';

export type ItemType = RecipeIngredient | IngredientSection;

const sectionsToItems = (sections: IngredientSection[]): ItemType[] => {
    if (sections.length === 0) {
        return [];
    }

    if (sections.length === 1) {
        return (
            sections[0].recipeIngredients?.map<ItemType>(ri => {
                if (!ri.ingredientSection || ri.ingredientSection.id !== sections[0].id) {
                    // eslint-disable-next-line prefer-destructuring
                    ri.ingredientSection = sections[0];
                }

                return ri;
            }) ?? []
        );
    }

    return sections.flatMap<ItemType>((section, index) => [
        ...(index !== 0 ? [section] : []),
        ...(section.recipeIngredients?.map<ItemType>(ri => {
            if (!ri.ingredientSection || ri.ingredientSection.id !== section.id) {
                ri.ingredientSection = section;
            }

            return ri;
        }) ?? []),
    ]);
};

export const Ingredients: React.FC = observer(() => {
    const { draftRecipe } = useRootStore();
    const isKeyboardOpen = useIsKeyboardOpen();

    const data = sectionsToItems(draftRecipe.recipe.ingredientSections ?? []);

    const hasMoreThanOneSection = (draftRecipe.recipe.ingredientSections?.length ?? 0) > 1;

    const lastRecipeSectionId = draftRecipe.recipe.ingredientSections?.at(-1)?.id;

    return (
        <GradientBackground>
            <NestableScrollableStepWrapper isKeyboardOpen={isKeyboardOpen}>
                <StepHeaderWrapperWithMargin>
                    <StepHeaderText>Ingredients</StepHeaderText>
                </StepHeaderWrapperWithMargin>
                {hasMoreThanOneSection && (
                    <FirstIngredientSectionHeader section={draftRecipe.recipe.ingredientSections?.[0]} />
                )}
                <DraggableList
                    // @ts-expect-error shenanigans with typing generic components and styled stuff
                    hasMoreThanOneSection={hasMoreThanOneSection}
                    data={data}
                    // prettier-ignore
                    keyExtractor={item =>
                        (item instanceof RecipeIngredient
                            ? item.id.toString() + '-' + item.ingredientSection?.id.toString()
                            : item.id.toString())
                    }
                    renderItem={renderItem}
                    onDragEnd={({ data: sections }) => draftRecipe.setIngredientSectionsFromArray(sections)}
                />
                {lastRecipeSectionId && <AddIngredientButton targetSectionId={lastRecipeSectionId} />}
                <AddSectionButtonWrapper>
                    <AddSectionButton onPress={draftRecipe.addNewIngredientSection}>
                        Add section
                    </AddSectionButton>
                </AddSectionButtonWrapper>
            </NestableScrollableStepWrapper>
        </GradientBackground>
    );
});

Ingredients.displayName = 'Ingredients';
