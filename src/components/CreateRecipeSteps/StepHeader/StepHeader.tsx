import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { BackIconSvg } from '~/components/Svg/BackIconSvg';
import { BackIconWrapper } from '~/views/RecipeView/RecipeView.styles';
import { Title, Wrapper } from './StepHeader.styles';

export const StepHeader: React.FC<NativeStackHeaderProps> = ({ navigation, options: { title } }) => {
    const insets = useSafeAreaInsets();

    return (
        <Wrapper bottomInset={insets.bottom}>
            <Title>{title}</Title>
            <BackIconWrapper onPress={() => navigation.goBack()}>
                <BackIconSvg />
            </BackIconWrapper>
        </Wrapper>
    );
};
