import { TextStyle } from 'react-native';
import styled from 'styled-components/native';
import { Theme } from '~/theme';

interface CommonProps {
    fontWeight?: keyof Theme['text']['normal']['font'];
    italic?: boolean;
}

interface TextProps extends CommonProps {
    size?: keyof Theme['text']['normal']['fontSize'];
}

interface HeadingProps extends CommonProps {
    size?: keyof Theme['text']['heading']['fontSize'];
}

export const TextBase = styled.Text<TextProps>`
    font-family: ${({ theme, italic = false, fontWeight = 'regular' }) => theme.text.normal[italic ? 'fontItalic' : 'font'][fontWeight]};
    color: ${({ theme }) => theme.palette.text[0]};
    font-size: ${({ theme, size = 'md' }) => theme.text.normal.fontSize[size]};
`;

const fontWeights: Record<keyof Theme['text']['normal']['font'], Required<TextStyle>['fontWeight']> = {
    extraLight: '100',
    light: '200',
    regular: 'normal',
    medium: '400',
    semiBold: '500',
    bold: 'bold',
    extraBold: '900',
};

export const HeadingBase = styled.Text<HeadingProps>`
    font-family: ${({ theme }) => theme.text.heading.font};
    font-weight: ${({ fontWeight = 'regular' }) => fontWeights[fontWeight]};
    font-style: ${({ italic = false }) => (italic ? 'italic' : 'normal')};
    color: ${({ theme }) => theme.palette.text[0]};
    font-size: ${({ theme, size = 'md' }) => theme.text.heading.fontSize[size]};
`;
