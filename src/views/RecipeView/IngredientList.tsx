import React from 'react';
import { observer } from 'mobx-react-lite';
import { DotSvg } from '~/components/RecipeIngredientListItem/DotSvg';
import { useRootStore } from '~/RootStoreContext';
import { capitalize } from '~/utils/capitalize';
import { round } from '~/utils/round';
import {
    IngredientRow,
    Ingredients,
    IngredientText,
    QuanitityText,
    SectionTitle,
    Text,
} from './RecipeView.styles';

export const IngredientList: React.FC = observer(() => {
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
                        <DotSvg />
                        <IngredientText>{capitalize(rcpIngr.ingredient?.name || '')} </IngredientText>
                        {rcpIngr.quantityFrom && (
                            <QuanitityText>
                                {round(rcpIngr.quantityFrom * currentRecipe.ingredientMultiplier, 2)}
                                {rcpIngr.quantityTo &&
                                    `—${round(rcpIngr.quantityTo * currentRecipe.ingredientMultiplier, 2)}`}{' '}
                                {rcpIngr.unit?.name}
                            </QuanitityText>
                        )}
                    </IngredientRow>
                )) ?? []),
            ])}
        </Ingredients>
    );
});
