import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { RecipeIngredientListItem } from '~/components/RecipeIngredientListItem';
import { useRootStore } from '~/RootStoreContext';
import { ListHeader, ListWrapper } from './StepIngredientList.styles';

interface StepIngredientListProps {
    style?: StyleProp<ViewStyle>;
}

export const StepIngredientList: React.FC<StepIngredientListProps> = observer(({ style }) => {
    const { draftStep } = useRootStore();

    if (draftStep.referencedIngredients.length === 0) {
        return null;
    }

    return (
        <ListWrapper>
            <ListHeader>Ingredients used in this step</ListHeader>
            {draftStep.referencedIngredients.map(item => (
                <RecipeIngredientListItem
                    key={item.id}
                    recipeIngredient={item}
                />
            ))}
        </ListWrapper>
    );
});
