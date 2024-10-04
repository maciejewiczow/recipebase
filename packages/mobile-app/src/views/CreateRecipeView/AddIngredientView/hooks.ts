import { useMemo } from 'react';
import { Ingredient, Unit } from 'backend-logic';
import { uniq, uniqBy } from 'lodash';
import { useRootStore } from '~/RootStoreContext';
import { isTruthy } from '~/utils/isTruthy';

export interface UnitListItemType {
    unitName: string;
    isCustom: boolean;
}

export const useUnitSelectData = () => {
    const { draftRecipe, units, draftIngredient } = useRootStore();

    const unitsWithDrafts = useMemo<Unit[]>(
        () => uniqBy(
                [
                    ...(draftRecipe.recipe.ingredientSections
                        ?.flatMap(is => is.recipeIngredients)
                        .filter(isTruthy)
                        .map(({ unit }) => unit)
                        .filter(isTruthy) ?? []),
                    ...units.units,
                ],
                unit => unit.name,
            ),
        [draftRecipe.recipe.ingredientSections, units.units],
    );

    const data = useMemo<UnitListItemType[]>(
        () => [
            ...(draftIngredient.unitSearchString &&
            !unitsWithDrafts.some(x => x.name === draftIngredient.unitSearchString)
                ? [
                      {
                          unitName: draftIngredient.unitSearchString,
                          isCustom: true,
                      },
                  ]
                : []),
            ...unitsWithDrafts.map(unit => ({ unitName: unit.name, isCustom: false })),
        ],
        [draftIngredient.unitSearchString, unitsWithDrafts],
    );

    return [data, unitsWithDrafts] as const;
};

export interface IngredientListItemType {
    ingredient: Ingredient;
    isCustom: boolean;
}

const shouldShowDraftingredient = (
    isInEditMode: boolean,
    ingredientsWithDrafts: IngredientListItemType[],
    draftIngredientName: string,
) => {
    if (isInEditMode) {
        return !!draftIngredientName;
    }

    return !(
        ingredientsWithDrafts.some(i => i.ingredient.name === draftIngredientName) || !draftIngredientName
    );
};

export const useIngredientListData = (isInEditMode: boolean) => {
    const { ingredients, draftIngredient, draftRecipe } = useRootStore();

    const ingredientsWithDrafts = useMemo<IngredientListItemType[]>(
        () => uniq([
                ...(draftRecipe.recipe.ingredientSections
                    ?.flatMap(is => is.recipeIngredients)
                    .filter(isTruthy)
                    .map(({ ingredient }) => ingredient)
                    .filter(isTruthy) ?? []),
                ...ingredients.ingredients,
            ]).map(ingredient => ({ ingredient, isCustom: false })),
        [draftRecipe.recipe.ingredientSections, ingredients.ingredients],
    );

    const data = useMemo<IngredientListItemType[]>(
        () => [
            ...(shouldShowDraftingredient(
                isInEditMode,
                ingredientsWithDrafts,
                draftIngredient.ingredient.name,
            )
                ? [
                      {
                          ingredient: draftIngredient.ingredient,
                          isCustom: true,
                      },
                  ]
                : []),
            ...ingredientsWithDrafts.filter(i => i.ingredient !== draftIngredient.ingredient),
        ],
        [draftIngredient.ingredient, ingredientsWithDrafts, isInEditMode],
    );

    return data;
};
