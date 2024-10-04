import React, { useCallback } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import { Observer, observer } from 'mobx-react-lite';
import { Label } from '~/components/Input/Input.styles';
import { IngredientsIcon } from '~/components/Svg/IngredientsIcon';
import { useRootStore } from '~/RootStoreContext';
import { useRunCancellablePromise } from '~/utils/useRunCancellablePromise';
import { IngredientListItemType, useIngredientListData } from './hooks';
import {
    EmptyListImageWrapper,
    EmptyListText,
    ListItemWrapper,
    StoredIngredientName,
} from './AddIngredientView.styles';

interface IngredientListProps {
    isInEditMode: boolean;
    setIsInIngredientSearchMode: (v: boolean) => void;
}

export const IngredientList: React.FC<IngredientListProps> = observer(
    ({ setIsInIngredientSearchMode, isInEditMode }) => {
        const { ingredients, draftIngredient } = useRootStore();

        useRunCancellablePromise(
            () => ingredients.fetchIngredients(draftIngredient.ingredient.name ?? ''),
            [draftIngredient.ingredient.name, ingredients],
        );

        const data = useIngredientListData(isInEditMode);

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
