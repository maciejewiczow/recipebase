import React from 'react';
import { StyleProp, TouchableNativeFeedback, ViewStyle } from 'react-native';
import { Base, ButtonText } from './Button.styles';
import { ButtonVariant } from './ButtonVariant';

export interface ButtonProps {
    children?: React.ReactNode;
    variant?: ButtonVariant;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    onPress?: () => any;
}

export const Button: React.FC<ButtonProps> = ({ children, style, onPress, variant = ButtonVariant.primary, disabled = false }) => (
    <TouchableNativeFeedback onPress={disabled ? () => {} : onPress}>
        <Base variant={variant} style={style} disabled={disabled}>
            <ButtonText variant={variant} disabled={disabled}>{children}</ButtonText>
        </Base>
    </TouchableNativeFeedback>
);
