import React from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { BackIconSvg } from '~/components/Svg/BackIconSvg';
import { BackIconWrapper, SafeAreaView, Title, Wrapper } from './ViewHeader.styles';

interface ViewHeaderProps {
    backIcon?: React.ReactNode;
}

export const ViewHeader: React.FC<NativeStackHeaderProps & ViewHeaderProps> = ({
    navigation,
    options: { title },
    backIcon,
}) => (
    <Wrapper>
        <SafeAreaView>
            <Title>{title}</Title>
            <BackIconWrapper onPress={() => navigation.goBack()}>
                {backIcon ?? <BackIconSvg />}
            </BackIconWrapper>
        </SafeAreaView>
    </Wrapper>
);
