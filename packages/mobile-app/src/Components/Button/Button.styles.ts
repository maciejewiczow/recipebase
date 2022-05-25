import styled from 'styled-components/native';
import { ButtonVariant } from './ButtonVariant';

interface ButtonPartsStyleProps {
    variant: ButtonVariant;
}

const getButtonBg = (variant: ButtonVariant) => {
    switch (variant) {
        case ButtonVariant.primary:
            return '#E88A36';

        case ButtonVariant.secondary:
            return '#F8F8F8';

        default:
            return 'transparent';
    }
};

const getButtonBorderColor = (variant: ButtonVariant) => {
    switch (variant) {
        case ButtonVariant.primary:
        case ButtonVariant.primaryOutline:
            return '#E88A36';

        case ButtonVariant.secondaryOutline:
            return 'white';

        case ButtonVariant.secondary:
            return '#F8F8F8';
    }
};

export const Base = styled.View<ButtonPartsStyleProps>`
    background-color: ${({ variant }) => getButtonBg(variant)};
    border-color:  ${({ variant }) => getButtonBorderColor(variant)};

    border-width: 2px;
    border-radius: 8px;

    padding: 18px 32px;

    align-items: center;
`;

export const ButtonContent = styled.Text<ButtonPartsStyleProps>`
    font-size: 18px;
    color: ${({ variant }) => (variant === ButtonVariant.secondary ? '#848484' : 'white')};
`;
