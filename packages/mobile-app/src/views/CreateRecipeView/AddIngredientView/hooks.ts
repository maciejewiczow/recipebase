import { useDeferredValue, useMemo } from 'react';
import { Ingredient, IngredientSection, Unit } from 'backend-logic';
import { uniqBy } from 'lodash';
import { DefaultItem } from '~/components/BottomSheetSelect/BottomSheetSelect';
import { useRootStore } from '~/RootStoreContext';
import { isTruthy } from '~/utils/isTruthy';
import { useRunCancellablePromise } from '~/utils/useRunCancellablePromise';

export interface UnitListItemType extends DefaultItem {
    isCustom: boolean;
}

export const getUnitsWithDrafts = (sections: IngredientSection[] | undefined, units: Unit[]) => uniqBy(
        [
            ...(sections
                ?.flatMap(is => is.recipeIngredients)
                .filter(isTruthy)
                .map(({ unit }) => unit)
                .filter(isTruthy) ?? []),
            ...units,
        ],
        unit => unit.name,
    );

export const useUnitsWithDrafts = () => {
    const { draftRecipe, units } = useRootStore();

    return useMemo<Unit[]>(
        () => getUnitsWithDrafts(draftRecipe.recipe.ingredientSections, units.units),
        [draftRecipe.recipe.ingredientSections, units.units],
    );
};

export const useUnitSelectData = (unitsWithDrafts: Unit[]) => {
    const { draftIngredient } = useRootStore();

    return useMemo<UnitListItemType[]>(
        () => [
            ...(draftIngredient.unitSearchString &&
            !unitsWithDrafts.some(x => x.name === draftIngredient.unitSearchString)
                ? [
                      {
                          label: draftIngredient.unitSearchString,
                          value: draftIngredient.unitSearchString,
                          isCustom: true,
                      },
                  ]
                : []),
            ...unitsWithDrafts.map(unit => ({ label: unit.name, value: unit.name, isCustom: false })),
        ],
        [draftIngredient.unitSearchString, unitsWithDrafts],
    );
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

export const getIngredientsWithDrafts = (
    ingredientSections: IngredientSection[] | undefined,
    ingredients: Ingredient[],
) => uniqBy(
        [
            ...(ingredientSections
                ?.flatMap(is => is.recipeIngredients)
                .filter(isTruthy)
                .map(({ ingredient }) => ingredient)
                .filter(isTruthy) ?? []),
            ...ingredients,
        ],
        i => i.id,
    );

export const useIngredientListData = (isInEditMode: boolean) => {
    const { ingredients, draftIngredient, draftRecipe } = useRootStore();

    const searchString = useDeferredValue(draftIngredient.ingredient.name ?? '');

    useRunCancellablePromise(() => ingredients.fetchIngredients(searchString), [searchString, ingredients]);

    const ingredientsWithDrafts = useMemo<IngredientListItemType[]>(
        () => getIngredientsWithDrafts(draftRecipe.recipe.ingredientSections, ingredients.ingredients)
                .filter(ingredient => ingredient.name.toLowerCase().includes(searchString.toLowerCase()))
                .map(ingredient => ({
                    ingredient,
                    isCustom: false,
                })),
        [draftRecipe.recipe.ingredientSections, ingredients.ingredients, searchString],
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
