import React, { useCallback, useEffect, useMemo } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import { Ingredient } from 'backend-logic';
import { uniq } from 'lodash';
import { Observer, observer } from 'mobx-react-lite';
import { Label } from '~/components/Input/Input.styles';
import { IngredientsIcon } from '~/components/Svg/IngredientsIcon';
import { useRootStore } from '~/RootStoreContext';
import { catchCancelledFlow } from '~/utils/catchCancelledFlow';
import { isTruthy } from '~/utils/isTruthy';
import {
    EmptyListImageWrapper,
    EmptyListText,
    ListItemWrapper,
    StoredIngredientName,
} from './AddIngredientView.styles';

interface IngredientListItemType {
    ingredient: Ingredient;
    isCustom: boolean;
}

interface IngredientListProps {
    isInEditMode: boolean;
    setIsInIngredientSearchMode: (v: boolean) => void;
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

export const IngredientList: React.FC<IngredientListProps> = observer(
    ({ setIsInIngredientSearchMode, isInEditMode }) => {
        const { ingredients, draftIngredient, draftRecipe } = useRootStore();

        useEffect(() => {
            const promise = ingredients.fetchIngredients(draftIngredient.ingredient.name ?? '');

            promise.catch(catchCancelledFlow);

            return () => promise.cancel();
        }, [draftIngredient.ingredient.name, ingredients]);

        const ingredientsWithDrafts = useMemo<IngredientListItemType[]>(
            () => [
                ...(uniq(
                    draftRecipe.recipe.ingredientSections
                        ?.flatMap(is => is.recipeIngredients)
                        .filter(isTruthy)
                        .map(({ ingredient }) => ingredient)
                        .filter(isTruthy),
                ).map(ingredient => ({ ingredient, isCustom: false })) ?? []),
                ...ingredients.ingredients.map(ingredient => ({
                    ingredient,
                    isCustom: false,
                })),
            ],
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

        const renderItem: Defined<FlatListProps<IngredientListItemType>['renderItem']> = useCallback(
            ({ item }) => (
                <Observer>
                    {() => (
                        <ListItemWrapper>
                            <StoredIngredientName
                                onPress={() => {
                                    draftIngredient.newIngredient = item.ingredient;
                                    setIsInIngredientSearchMode(false);
                                }}
                                isCustomItem={item.isCustom}
                            >
                                {item.ingredient.name}
                            </StoredIngredientName>
                        </ListItemWrapper>
                    )}
                </Observer>
            ),
            [draftIngredient, setIsInIngredientSearchMode],
        );

        return (
            <FlatList<IngredientListItemType>
                keyboardShouldPersistTaps="handled"
                ListHeaderComponent={<Label>Search results</Label>}
                data={data}
                renderItem={renderItem}
                ListEmptyComponent={
                    <EmptyListImageWrapper>
                        <IngredientsIcon fill="#999" />
                        <EmptyListText>Search for some ingredients...</EmptyListText>
                    </EmptyListImageWrapper>
                }
            />
        );
    },
);
