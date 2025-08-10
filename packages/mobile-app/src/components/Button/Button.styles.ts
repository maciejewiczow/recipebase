import styled, { DefaultTheme } from 'styled-components/native';
import { TextBase } from '../Text';
import { ButtonVariant } from './Button';

interface ButtonPartsStyleProps {
    variant: ButtonVariant;
    disabled: boolean;
    theme: DefaultTheme;
}

const getButtonBg = ({ variant, disabled, theme }: ButtonPartsStyleProps) => {
    if (disabled) {
        return '#F0F0F0';
    }

    switch (variant) {
        case 'primary':
            return theme.palette.primary[0];

        default:
            return 'transparent';
    }
};

const getButtonBorderColor = ({ variant, disabled, theme }: ButtonPartsStyleProps) => {
    if (disabled) {
        switch (variant) {
            case 'primary':
                return '#F0F0F0';

            case 'outline':
            case 'transparent':
                return '#747474';
        }
    }

    switch (variant) {
        case 'primary':
            return theme.palette.primary[0];

        case 'outline':
            return theme.palette.text[0];

        case 'transparent':
            return 'transparent';
    }
};

const getButtonTextColor = ({ variant, disabled, theme }: ButtonPartsStyleProps) => {
    if (disabled) {
        return '#848484';
    }

    switch (variant) {
        case 'outline':
        case 'transparent':
            return theme.palette.text[0];

        case 'primary':
            return theme.palette.background[1];
    }
};

export const Touchable = styled.TouchableOpacity``;

export const Base = styled.View<ButtonPartsStyleProps>`
    background-color: ${props => getButtonBg(props)};
    border-color: ${props => getButtonBorderColor(props)};

    border-width: 1px;
    border-radius: ${({ theme }) => theme.border.radiusBig};

    padding: 18px;

    justify-content: center;
    flex-direction: row;
    gap: 8px;
`;

export const ButtonText = styled(TextBase)<ButtonPartsStyleProps>`
    color: ${props => getButtonTextColor(props)};
    font-family: ${({ theme }) => theme.text.normal.font.medium};
    text-align-vertical: center;
`;

export const Loading = styled.ActivityIndicator.attrs({
    color: 'white',
})``;
