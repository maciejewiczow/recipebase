import React from 'react';
import { TextInput as TextInputComponent } from 'react-native';
import { InputProps } from './types';
import { InputWrapper, Label, TextInput, Wrapper } from './Input.styles';

export const Input: React.FC<InputProps & { ref?: React.Ref<TextInputComponent> }> = ({
    numberOfLines = 1,
    onChange,
    style,
    label,
    inputStyle,
    rightIcon,
    ref,
    ...rest
}) => (
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
);

Input.displayName = 'Input';
