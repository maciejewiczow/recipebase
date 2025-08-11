import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { BackIconSvg } from '~/components/Svg/BackIconSvg';
import { BackIconWrapper } from '~/views/RecipeView/RecipeView.styles';
import { Title, Wrapper } from './ViewHeader.styles';

export const ViewHeader: React.FC<NativeStackHeaderProps> = ({ navigation, options: { title } }) => {
    const insets = useSafeAreaInsets();

    return (
        <Wrapper topInset={insets.top}>
            <Title>{title}</Title>
            <BackIconWrapper
                topInset={insets.top}
                onPress={() => navigation.goBack()}
            >
                <BackIconSvg />
            </BackIconWrapper>
        </Wrapper>
    );
};
