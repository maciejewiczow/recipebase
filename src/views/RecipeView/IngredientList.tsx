import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '~/RootStoreContext';
import { capitalize } from '~/utils/capitalize';
import { round } from '~/utils/round';
import { IngredientRow, Ingredients, IngredientText, SectionTitle, Text } from './RecipeView.styles';

export interface IngredientListProps {
    multiplier: number;
}

export const IngredientList: React.FC<IngredientListProps> = observer(({ multiplier }) => {
    const { currentRecipe } = useRootStore();

    if (!currentRecipe.recipe) {
        return null;
    }

    if ((currentRecipe.recipe.ingredientSections?.length ?? 0) === 0) {
        return (
            <Ingredients>
                <Text>No ingredients to show</Text>
            </Ingredients>
        );
    }

    return (
        <Ingredients>
            {currentRecipe.recipe.ingredientSections?.flatMap((section, si) => [
                (currentRecipe.recipe?.ingredientSections?.length ?? 0) > 1 && section.name && (
                    <SectionTitle
                        isFirstChild={si === 0}
                        key={section.id}
                    >
                        {section.name}
                    </SectionTitle>
                ),
                ...(section.recipeIngredients?.map(rcpIngr => (
                    <IngredientRow key={`${section.id}_${rcpIngr.id}`}>
                        <IngredientText>• {capitalize(rcpIngr.ingredient?.name || '')} </IngredientText>
                        {rcpIngr.quantityFrom && (
                            <IngredientText>
                                {round(rcpIngr.quantityFrom * multiplier, 2)}
                                {rcpIngr.quantityTo && `—${round(rcpIngr.quantityTo * multiplier, 2)}`}{' '}
                                {rcpIngr.unit?.name}
                            </IngredientText>
                        )}
                    </IngredientRow>
                )) ?? []),
            ])}
        </Ingredients>
    );
});
