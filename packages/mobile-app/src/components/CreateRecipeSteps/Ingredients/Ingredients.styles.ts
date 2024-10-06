import styled from 'styled-components/native';
import { IngredientSectionHeader } from './IngredientSectionHeader';
import { draggableListStepMargin } from '../common.styles';

export const IngredientSectionHeaderWithMargin = styled(IngredientSectionHeader)`
    ${draggableListStepMargin}
`;
