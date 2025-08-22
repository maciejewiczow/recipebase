import React from 'react';
import { ToastConfigParams } from 'react-native-toast-message';
import { shadowStyles } from '../common.styles';
import { ErrorIcon, Heading, Text, TextWrapper, Wrapper } from './ErrorToast.styles';

export const ErrorToast: React.FC<ToastConfigParams<undefined>> = ({ text1, text2 }) => (
    <Wrapper style={shadowStyles.shadow}>
        <ErrorIcon />
        <TextWrapper>
            <Heading>{text1}</Heading>
            <Text>{text2}</Text>
        </TextWrapper>
    </Wrapper>
);
