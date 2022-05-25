import React from 'react';
import { StyleProp, TouchableNativeFeedback, ViewStyle } from 'react-native';
import { Base, ButtonContent } from './Button.styles';
import { ButtonVariant } from './ButtonVariant';

export interface ButtonProps {
    children?: React.ReactNode;
    variant?: ButtonVariant;
    style?: StyleProp<ViewStyle>;
    onPress?: () => any;
}

export const Button: React.FC<ButtonProps> = ({ children, style, onPress, variant = ButtonVariant.primary }) => (
    <TouchableNativeFeedback onPress={onPress}>
        <Base variant={variant} style={style}>
            <ButtonContent variant={variant}>{children}</ButtonContent>
        </Base>
    </TouchableNativeFeedback>
);
