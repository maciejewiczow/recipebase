import React, { forwardRef } from 'react';
import {
    StyleProp,
    TextInput as TextInputComponent,
    TextInputProps,
    TextStyle,
    ViewStyle,
} from 'react-native';
import { InputWrapper, Label, TextInput, Wrapper } from './Input.styles';

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
        | 'textContentType'
        | 'keyboardType'
        | 'inputMode'
        | 'secureTextEntry'
    > {
    label?: string;
    style?: StyleProp<ViewStyle>;
    onChange?: (val: string) => void;
    inputStyle?: StyleProp<TextStyle>;
    rightIcon?: React.ReactNode;
}

export const Input = forwardRef<TextInputComponent, InputProps>(
    ({ numberOfLines = 1, onChange, style, label, inputStyle, rightIcon, ...rest }, ref) => (
        <Wrapper style={style}>
            {label && <Label>{label}</Label>}
            <InputWrapper>
                <TextInput
                    ref={ref}
                    style={inputStyle}
                    onChangeText={onChange}
                    numberOfLines={numberOfLines}
                    {...rest}
                />
                {rightIcon}
            </InputWrapper>
        </Wrapper>
    ),
);

Input.displayName = 'Input';
