import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Circle, Line, Wrapper } from './RecipeStepLineDecorator.styles';
import { RecipeProgression } from './types';

export interface RecipeStepLineDecoratorProps {
    progression: RecipeProgression;
    style?: StyleProp<ViewStyle>;
    isLast?: boolean;
}

export const RecipeStepLineDecorator: React.FC<
    RecipeStepLineDecoratorProps
> = ({ progression, style, isLast }) => (
    <Wrapper style={style}>
        <Circle progression={progression} />
        {!isLast && <Line progression={progression} />}
    </Wrapper>
);
