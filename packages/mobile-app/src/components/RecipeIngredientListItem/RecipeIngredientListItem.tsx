import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { RecipeIngredient } from 'backend-logic';
import {
    IngredientNameWrapper,
    QuantityWrapper,
    RecipeIngredientWrapper,
    Text,
} from './RecipeIngredientListItem.styles';

export interface RecipeIngredientListItemProps {
    leftSection?: ReactNode;
    rightSection?: ReactNode;
    recipeIngredient: RecipeIngredient;
    style?: StyleProp<ViewStyle>;
}

export const RecipeIngredientListItem: React.FC<RecipeIngredientListItemProps> = ({
    leftSection,
    rightSection,
    recipeIngredient: { quantityFrom, quantityTo, unit, ingredient },
    style,
}) => (
    <RecipeIngredientWrapper style={style}>
        {leftSection}
        <QuantityWrapper>
            <Text>
                {quantityFrom}
                {quantityTo ? '-' : ''}
                {quantityTo} {unit?.name}
            </Text>
        </QuantityWrapper>
        <IngredientNameWrapper>
            <Text>{ingredient?.name}</Text>
        </IngredientNameWrapper>
        {rightSection}
    </RecipeIngredientWrapper>
);
