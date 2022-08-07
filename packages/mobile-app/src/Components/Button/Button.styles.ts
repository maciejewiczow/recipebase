import styled from 'styled-components/native';
import { ButtonVariant } from './ButtonVariant';

interface ButtonPartsStyleProps {
    variant: ButtonVariant;
    disabled: boolean;
}

const getButtonBg = ({ variant, disabled }: ButtonPartsStyleProps) => {
    if (disabled)
        return '#F0F0F0';

    switch (variant) {
        case ButtonVariant.primary:
            return '#E88A36';

        case ButtonVariant.secondary:
            return '#F8F8F8';

        default:
            return 'transparent';
    }
};

const getButtonBorderColor = ({ variant, disabled }: ButtonPartsStyleProps) => {
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
            return '#E5E5E5';
    }
};

const getButtonTextColor = ({ variant, disabled }: ButtonPartsStyleProps) => {
    if (disabled)
        return '#848484';

    if (variant === ButtonVariant.secondary)
        return '#616161';

    return 'white';
};

export const Base = styled.View<ButtonPartsStyleProps>`
    background-color: ${props => getButtonBg(props)};
    border-color:  ${props => getButtonBorderColor(props)};

    border-width: 2px;
    border-radius: ${({ theme }) => theme.border.radiusSmall};

    padding: 18px 32px;

    align-items: center;
`;

export const ButtonText = styled.Text<ButtonPartsStyleProps>`
    font-size: 18px;
    color: ${props => getButtonTextColor(props)};
`;
