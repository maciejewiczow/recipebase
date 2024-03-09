import styled from 'styled-components/native';
import {
    Input as CommonInput,
    draggableListStepMargin,
} from '../common.styles';
import { IngredientSectionHeader } from './IngredientSectionHeader';

export const IngredientSectionHeaderWithMargin = styled(
    IngredientSectionHeader,
)`
    ${draggableListStepMargin}
`;

export const RecipeIngredientWrapper = styled.View`
    flex-flow: row nowrap;
    margin-bottom: 10px;
    gap: 12px;
`;

export const IngredientNameWrapper = styled.View`
    flex: 4;
`;

export const QuantityWrapper = styled.View`
    flex: 3;
`;

export const Text = styled.Text`
    color: #555;
    font-size: 16px;
`;

export const IngredientNameInput = styled(CommonInput)`
    margin-right: 12px;
    flex-grow: 1;
    max-width: 66.5%;
    margin-bottom: 0;
`;

export const IngredientQuantityInput = styled(CommonInput)`
    width: 90px;
    margin-bottom: 0;
`;

export const IngredientSectionWrapper = styled.View`
    margin-bottom: 30px;
`;
