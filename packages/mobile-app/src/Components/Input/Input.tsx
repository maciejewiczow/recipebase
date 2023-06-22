import React from 'react';
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { Label, TextInput, Wrapper } from './Input.styles';

export interface InputProps {
    label?: string;
    placeholder?: string;
    style?: StyleProp<ViewStyle>;
    value?: string;
    onChange?: (val: string) => any;
    multiline?: boolean;
    numberOfLines?: number;
    onBlur?: TextInputProps['onBlur'];
    onEndEditing?: TextInputProps['onEndEditing'];
}

export const Input: React.FC<InputProps> = ({
    multiline,
    numberOfLines = 1,
    value,
    onChange,
    style,
    label,
    placeholder,
    onBlur,
    onEndEditing,
}) => (
    <Wrapper style={style}>
        {label && <Label>{label}</Label>}
        <TextInput
            value={value}
            onBlur={onBlur}
            onEndEditing={onEndEditing}
            onChangeText={onChange}
            placeholder={placeholder}
            multiline={multiline}
            numberOfLines={numberOfLines}
        />
    </Wrapper>
);
