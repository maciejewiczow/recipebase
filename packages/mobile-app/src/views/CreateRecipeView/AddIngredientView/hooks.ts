import { useMemo } from 'react';
import { Ingredient, Unit } from 'backend-logic';
import { uniqBy } from 'lodash';
import { DefaultItem } from '~/components/BottomSheetSelect/BottomSheetSelect';
import { useRootStore } from '~/RootStoreContext';
import { isTruthy } from '~/utils/isTruthy';

export interface UnitListItemType extends DefaultItem {
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

export const useIngredientListData = (isInEditMode: boolean, searchString: string) => {
    const { ingredients, draftIngredient, draftRecipe } = useRootStore();

    const ingredientsWithDrafts = useMemo<IngredientListItemType[]>(
        () => uniqBy(
                [
                    ...(draftRecipe.recipe.ingredientSections
                        ?.flatMap(is => is.recipeIngredients)
                        .filter(isTruthy)
                        .map(({ ingredient }) => ingredient)
                        .filter(isTruthy)
                        .filter(ingredient => ingredient.name.toLowerCase().includes(searchString.toLowerCase()),
                        ) ?? []),
                    ...ingredients.ingredients,
                ],
                i => i.id,
            ).map(ingredient => ({ ingredient, isCustom: false })),
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
