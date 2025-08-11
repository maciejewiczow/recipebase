import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Base, ButtonText, Loading, Touchable } from './Button.styles';

export type ButtonVariant = 'primary' | 'outline' | 'transparent';

export interface ButtonProps {
    children?: React.ReactNode;
    variant?: ButtonVariant;
    rightIcon?: React.ReactNode;
    leftIcon?: React.ReactNode;
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
    rightIcon,
    leftIcon,
}) => (
    <Touchable
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
                <>
                    {leftIcon}
                    <ButtonText
                        variant={variant}
                        disabled={disabled}
                    >
                        {children}
                    </ButtonText>
                    {rightIcon}
                </>
            )}
        </Base>
    </Touchable>
);
