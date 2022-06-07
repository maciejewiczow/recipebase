import styled from 'styled-components/native';
import { ButtonVariant } from './ButtonVariant';

interface ButtonPartsStyleProps {
    variant: ButtonVariant;
    disabled: boolean;
}

const getButtonBg = (variant: ButtonVariant, disabled: boolean) => {
    if (disabled)
        return '#F0F0F0';

    switch (variant) {
        case ButtonVariant.primary:
            return '#E88A36';

        case ButtonVariant.secondary:
            return '#8E8E8E';

        default:
            return 'transparent';
    }
};

const getButtonBorderColor = (variant: ButtonVariant, disabled: boolean) => {
    if (disabled) {
        switch (variant) {
            case ButtonVariant.primary:
            case ButtonVariant.secondary:
                return '#F0F0F0';

            case ButtonVariant.primaryOutline:
            case ButtonVariant.secondaryOutline:
                return '#747474';
        }
    }

    switch (variant) {
        case ButtonVariant.primary:
        case ButtonVariant.primaryOutline:
            return '#E88A36';

        case ButtonVariant.secondaryOutline:
            return 'white';

        case ButtonVariant.secondary:
            return '#8E8E8E';
    }
};

export const Base = styled.View<ButtonPartsStyleProps>`
    background-color: ${({ variant, disabled }) => getButtonBg(variant, disabled)};
    border-color:  ${({ variant, disabled }) => getButtonBorderColor(variant, disabled)};

    border-width: 2px;
    border-radius: ${({ theme }) => theme.border.radiusSmall};

    padding: 18px 32px;

    align-items: center;
`;

export const ButtonText = styled.Text<ButtonPartsStyleProps>`
    font-size: 18px;
    color: ${({ disabled }) => (disabled ? '#848484' : 'white')};
`;
