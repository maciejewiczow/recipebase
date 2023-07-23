import styled from 'styled-components/native';
import { Input as OriginalInput } from '../common.styles';

export const RecipeIngredientWrapper = styled.View`
    flex-flow: row nowrap;
    margin-bottom: 8px;
`;

export const IngredientNameInput = styled(OriginalInput)`
    margin-right: 12px;
    flex-grow: 1;
    max-width: 66.5%;
    margin-bottom: 0;
`;

export const IngredientQuantityInput = styled(OriginalInput)`
    width: 90px;
    margin-bottom: 0;
`;

export const IngredientSectionWrapper = styled.View`
    margin-bottom: 30px;
`;


