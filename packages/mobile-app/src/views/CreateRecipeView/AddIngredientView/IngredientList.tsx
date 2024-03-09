import { Ingredient } from 'backend-logic';
import { Observer, observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import { useRootStore } from '~/RootStoreContext';
import { Label } from '~/components/Input/Input.styles';
import {
    EmptyListImageWrapper,
    EmptyListText,
    ListItemWrapper,
    StoredIngredientName,
} from './AddIngredientView.styles';
import { catchCancelledFlow } from '~/utils/catchCancelledFlow';
import { IngredientsIcon } from '~/components/Svg/IngredientsIcon';

interface IngredientListItemType {
    ingredient: Ingredient;
    isCustom: boolean;
}

interface IngredientListProps {
    setIsInIngredientSearchMode: (v: boolean) => void;
}

export const IngredientList: React.FC<IngredientListProps> = observer(({ setIsInIngredientSearchMode }) => {
    const { ingredients, draftIngredient } = useRootStore();

    useEffect(() => {
        const promise = ingredients.fetchIngredients(draftIngredient.ingredient.name ?? '');

        promise.catch(catchCancelledFlow);

        return () => promise.cancel();
    }, [draftIngredient.ingredient.name, ingredients]);

    const data = useMemo(
        () => [
            ...(ingredients.ingredients.some(i => i.name === draftIngredient.ingredient.name) ||
            !draftIngredient.ingredient.name
                ? []
                : [
                      {
                          ingredient: draftIngredient.ingredient,
                          isCustom: true,
                      },
                  ]),
            ...ingredients.ingredients.map(ingredient => ({
                ingredient,
                isCustom: false,
            })),
        ],
        [draftIngredient.ingredient, ingredients.ingredients],
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
});
