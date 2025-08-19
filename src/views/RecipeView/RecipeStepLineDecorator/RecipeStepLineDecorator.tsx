import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { StepNumberWrapper } from '~/views/CreateRecipeView/AddStepView/AddStepView.styles';
import { Line, StepNumberText, Wrapper } from './RecipeStepLineDecorator.styles';

export interface RecipeStepLineDecoratorProps {
    stepNumber: number;
    isLast: boolean;
    style?: StyleProp<ViewStyle>;
}

export const RecipeStepLineDecorator: React.FC<RecipeStepLineDecoratorProps> = ({
    style,
    stepNumber,
    isLast,
}) => (
    <Wrapper style={style}>
        <StepNumberWrapper>
            <StepNumberText>{stepNumber}</StepNumberText>
        </StepNumberWrapper>
        {!isLast && <Line />}
    </Wrapper>
);
