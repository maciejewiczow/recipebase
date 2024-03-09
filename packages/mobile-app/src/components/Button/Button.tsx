import React from 'react';
import { StyleProp, TouchableNativeFeedback, ViewStyle } from 'react-native';
import { Base, ButtonText } from './Button.styles';

export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'primary-outline'
    | 'secondary-outline'
    | 'transparent';

export interface ButtonProps {
    children?: React.ReactNode;
    variant?: ButtonVariant;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    onPress?: () => any;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    style,
    onPress,
    variant = 'primary',
    disabled = false,
}) => (
    <TouchableNativeFeedback
        disabled={disabled}
        onPress={disabled ? () => {} : onPress}
    >
        <Base
            variant={variant}
            style={style}
            disabled={disabled}
        >
            <ButtonText
                variant={variant}
                disabled={disabled}
            >
                {children}
            </ButtonText>
        </Base>
    </TouchableNativeFeedback>
);
