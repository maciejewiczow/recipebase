import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Label, TextInput, Wrapper } from './Input.styles';

export interface InputProps {
    label?: string;
    placeholder?: string;
    style?: StyleProp<ViewStyle>;
    value?: string;
    onChange?: (val: string) => any;
    multiline?: boolean;
    numberOfLines?: number;
}

export const Input: React.FC<InputProps> = ({
    multiline,
    numberOfLines = 1,
    value,
    onChange,
    style,
    label,
    placeholder,
}) => (
    <Wrapper style={style}>
        {label && <Label>{label}</Label>}
        <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            multiline={multiline}
            numberOfLines={numberOfLines}
        />
    </Wrapper>
);
