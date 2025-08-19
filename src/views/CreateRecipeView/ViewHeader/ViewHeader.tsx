import React from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { BackIconSvg } from '~/components/Svg/BackIconSvg';
import { BackIconWrapper, SafeAreaView, Title, Wrapper } from './ViewHeader.styles';

export const ViewHeader: React.FC<NativeStackHeaderProps> = ({ navigation, options: { title } }) => (
    <Wrapper>
        <SafeAreaView>
            <Title>{title}</Title>
            <BackIconWrapper onPress={() => navigation.goBack()}>
                <BackIconSvg />
            </BackIconWrapper>
        </SafeAreaView>
    </Wrapper>
);
