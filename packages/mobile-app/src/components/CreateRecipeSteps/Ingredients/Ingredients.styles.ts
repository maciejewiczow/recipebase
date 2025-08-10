import styled from 'styled-components/native';
import { IngredientSectionHeader } from './IngredientSectionHeader';
import { draggableListStepMargin } from '../common.styles';

export const FirstIngredientSectionHeader = styled(IngredientSectionHeader)`
    margin-top: 18px;
    ${draggableListStepMargin}
`;
