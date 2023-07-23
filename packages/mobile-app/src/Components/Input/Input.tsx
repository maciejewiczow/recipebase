import React from 'react';
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
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
    inputStyle?: StyleProp<TextStyle>;
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
    inputStyle,
}) => (
    <Wrapper style={style}>
        {label && <Label>{label}</Label>}
        <TextInput
            style={inputStyle}
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
