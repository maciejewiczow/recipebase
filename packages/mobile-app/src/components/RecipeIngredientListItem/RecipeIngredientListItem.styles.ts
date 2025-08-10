import styled from 'styled-components/native';
import { TextBase } from '../Text';

export const RecipeIngredientWrapper = styled.View`
    flex-flow: row nowrap;
    align-items: center;
    gap: 16px;
    background: ${({ theme }) => theme.palette.background[3]};
    padding: 8px 12px;
    border-radius: ${({ theme }) => theme.border.radius};
`;

export const TextWrapper = styled.View`
    flex-direction: row;
    gap: 8px;
    flex: 1;
    align-items: center;
`;

export const IngredientName = styled(TextBase).attrs({
    fontWeight: 'bold',
    size: 'lg',
})`
    position: relative;
    bottom: 1px;
    max-width: 60%;
`;

export const QuantityAndUnit = styled(TextBase).attrs({
    fontWeight: 'medium',
    size: 'lg',
})``;
