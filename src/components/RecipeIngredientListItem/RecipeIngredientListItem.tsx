import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { RecipeIngredient } from 'backend-logic';
import { observer } from 'mobx-react-lite';
import { capitalize } from '~/utils/capitalize';
import { DotSvg } from './DotSvg';
import {
    IngredientName,
    QuantityAndUnit,
    RecipeIngredientWrapper,
    TextWrapper,
} from './RecipeIngredientListItem.styles';

export interface RecipeIngredientListItemProps {
    leftSection?: ReactNode;
    rightSection?: ReactNode;
    recipeIngredient: RecipeIngredient;
    style?: StyleProp<ViewStyle>;
}

export const RecipeIngredientListItem: React.FC<RecipeIngredientListItemProps> = observer(
    ({
        leftSection,
        rightSection,
        recipeIngredient: { quantityFrom, quantityTo, unit, ingredient },
        style,
    }) => (
        <RecipeIngredientWrapper style={style}>
            {leftSection}
            <DotSvg />
            <TextWrapper>
                <IngredientName>{capitalize(ingredient?.name ?? '')}</IngredientName>
                {!!quantityFrom && (
                    <QuantityAndUnit>
                        {quantityFrom}
                        {quantityTo ? '-' : ''}
                        {quantityTo} {unit?.name}
                    </QuantityAndUnit>
                )}
            </TextWrapper>
            {rightSection}
        </RecipeIngredientWrapper>
    ),
);
