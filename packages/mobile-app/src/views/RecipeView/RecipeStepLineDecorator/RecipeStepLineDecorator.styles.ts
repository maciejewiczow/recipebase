import DashedLine from 'react-native-dashed-line';
import styled from 'styled-components/native';
import { RecipeStepLineDecoratorProps } from './RecipeStepLineDecorator';
import { RecipeProgression } from './types';

export const Wrapper = styled.View`
    width: 0;
    align-items: center;
`;

export const Circle = styled.View<RecipeStepLineDecoratorProps>`
    background: ${({ progression }) => (progression === RecipeProgression.past ? '#CFCFCF' : 'white')};
    border-width: 5px;
    border-color: ${({ progression, theme }) => (progression === RecipeProgression.current ? theme.palette.primary[0] : '#CFCFCF')};
    border-style: solid;

    border-radius: 10px;
    width: 20px;
    height: 20px;
`;

export const Line = styled(DashedLine).attrs<RecipeStepLineDecoratorProps>(({ progression, theme }) => ({
    axis: 'vertical',
    dashColor: progression === RecipeProgression.current ? theme.palette.primary[0] : '#CFCFCF',
    dashThickness: 4,
    dashGap: progression !== RecipeProgression.past ? 7 : 0,
    dashLength: 7,
}))<RecipeStepLineDecoratorProps>`
    flex: 1;
`;
