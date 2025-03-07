import styled from 'styled-components/native';

export const TextBase = styled.Text`
    font-family: ${({ theme }) => theme.text.normal.font.regular};
    color: ${({ theme }) => theme.palette.text[0]};
    font-size: ${({ theme }) => theme.text.normal.fontSize.md};
`;

export const HeadingBase = styled.Text`
    font-family: ${({ theme }) => theme.text.heading.font};
    color: ${({ theme }) => theme.palette.text[0]};
    font-size: ${({ theme }) => theme.text.heading.fontSize.md};
`;
