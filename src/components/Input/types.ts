import React from 'react';
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

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
