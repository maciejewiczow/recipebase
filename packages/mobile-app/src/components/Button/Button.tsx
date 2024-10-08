import React from 'react';
import { StyleProp, TouchableNativeFeedback, ViewStyle } from 'react-native';
import { Base, ButtonText, Loading } from './Button.styles';

export type ButtonVariant = 'primary' | 'secondary' | 'primary-outline' | 'secondary-outline' | 'transparent';

export interface ButtonProps {
    children?: React.ReactNode;
    variant?: ButtonVariant;
    disabled?: boolean;
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    style,
    onPress,
    variant = 'primary',
    loading,
    disabled = false,
}) => (
    <TouchableNativeFeedback
        disabled={disabled}
        onPress={disabled ? undefined : onPress}
    >
        <Base
            variant={variant}
            style={style}
            disabled={disabled}
        >
            {loading ? (
                <Loading />
            ) : (
                <ButtonText
                    variant={variant}
                    disabled={disabled}
                >
                    {children}
                </ButtonText>
            )}
        </Base>
    </TouchableNativeFeedback>
);
