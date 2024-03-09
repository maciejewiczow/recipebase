import React, { forwardRef } from 'react';
import {
    StyleProp,
    TextInput as TextInputComponent,
    TextInputProps,
    TextStyle,
    ViewStyle,
} from 'react-native';
import { Label, TextInput, Wrapper } from './Input.styles';

export interface InputProps
    extends Pick<
        TextInputProps,
        | 'onBlur'
        | 'onFocus'
        | 'onEndEditing'
        | 'placeholder'
        | 'multiline'
        | 'numberOfLines'
        | 'value'
        | 'autoCapitalize'
        | 'onSubmitEditing'
        | 'autoFocus'
    > {
    label?: string;
    style?: StyleProp<ViewStyle>;
    onChange?: (val: string) => void;
    inputStyle?: StyleProp<TextStyle>;
}

export const Input = forwardRef<TextInputComponent, InputProps>(
    ({ numberOfLines = 1, onChange, style, label, inputStyle, ...rest }, ref) => (
        <Wrapper style={style}>
            {label && <Label>{label}</Label>}
            <TextInput
                ref={ref}
                style={inputStyle}
                onChangeText={onChange}
                numberOfLines={numberOfLines}
                {...rest}
            />
        </Wrapper>
    ),
);

Input.displayName = 'Input';
