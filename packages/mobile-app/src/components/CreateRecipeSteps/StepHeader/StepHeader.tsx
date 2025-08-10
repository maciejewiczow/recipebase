import React from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { BackIconSvg } from '~/components/Svg/BackIconSvg';
import { BackIconWrapper } from '~/views/RecipeView/RecipeView.styles';
import { Title, Wrapper } from './StepHeader.styles';

export const StepHeader: React.FC<NativeStackHeaderProps> = ({ navigation, options: { title } }) => (
    <Wrapper>
        <Title>{title}</Title>
        <BackIconWrapper onPress={() => navigation.goBack()}>
            <BackIconSvg />
        </BackIconWrapper>
    </Wrapper>
);
