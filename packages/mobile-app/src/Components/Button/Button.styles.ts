import styled from 'styled-components/native';
import { ButtonVariant } from './Button';

interface ButtonPartsStyleProps {
    variant: ButtonVariant;
    disabled: boolean;
}

const getButtonBg = ({ variant, disabled }: ButtonPartsStyleProps) => {
    if (disabled)
        return '#F0F0F0';

    switch (variant) {
        case 'primary':
            return '#E88A36';

        case 'secondary':
            return '#F8F8F8';

        default:
            return 'transparent';
    }
};

const getButtonBorderColor = ({ variant, disabled }: ButtonPartsStyleProps) => {
    if (disabled) {
        switch (variant) {
            case 'primary':
            case 'secondary':
                return '#F0F0F0';

            case 'primary-outline':
            case 'secondary-outline':
            case 'transparent':
                return '#747474';
        }
    }

    switch (variant) {
        case 'primary':
        case 'primary-outline':
            return '#E88A36';

        case 'secondary-outline':
            return 'white';

        case 'secondary':
            return '#E5E5E5';

        case 'transparent':
            return 'transparent';
    }
};

const getButtonTextColor = ({ variant, disabled }: ButtonPartsStyleProps) => {
    if (disabled)
        return '#848484';

    switch (variant) {
        case 'secondary':
            return '#555';

        case 'transparent':
            return '#333';

        default:
            return 'white';
    }
};

export const Base = styled.View<ButtonPartsStyleProps>`
    background-color: ${props => getButtonBg(props)};
    border-color:  ${props => getButtonBorderColor(props)};

    border-width: 2px;
    border-radius: ${({ theme }) => theme.border.radiusSmall};

    padding: 12px 32px;

    align-items: center;
`;

export const ButtonText = styled.Text<ButtonPartsStyleProps>`
    font-size: 18px;
    color: ${props => getButtonTextColor(props)};
`;
