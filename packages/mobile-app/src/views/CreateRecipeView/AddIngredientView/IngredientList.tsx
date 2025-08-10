import React, { useCallback } from 'react';
import { FlatListProps } from 'react-native';
import { Observer, observer } from 'mobx-react-lite';
import { useRootStore } from '~/RootStoreContext';
import { IngredientListItemType } from './hooks';
import {
    EmptyListPlaceholder,
    IngredientListComponent,
    ListItemWrapper,
    StoredIngredientName,
} from './AddIngredientView.styles';

interface IngredientListProps {
    setIsInIngredientSearchMode: (v: boolean) => void;
    ingredientListItems: IngredientListItemType[];
}

export const IngredientList: React.FC<IngredientListProps> = observer(
    ({ setIsInIngredientSearchMode, ingredientListItems: data }) => {
        const { draftIngredient } = useRootStore();

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

        if (data.length === 0) {
            return <EmptyListPlaceholder />;
        }

        return (
            <IngredientListComponent<IngredientListItemType>
                keyboardShouldPersistTaps="handled"
                data={data}
                renderItem={renderItem}
            />
        );
    },
);
