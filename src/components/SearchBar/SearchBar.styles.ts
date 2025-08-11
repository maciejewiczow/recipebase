import Icon from '@react-native-vector-icons/feather';
import styled, { css } from 'styled-components/native';
import { createStyledIcon } from '~/utils/createStyledIcon';

export const SearchIcon = createStyledIcon(
    Icon,
    ({ theme }) => ({
        name: 'search',
        size: 28,
        color: theme.palette.text[0],
    }),
    css``,
);

export const InputWrapper = styled.View`
    background: ${({ theme }) => theme.palette.background[4]};
    border-radius: ${({ theme }) => theme.border.radiusBig};
    padding: 0 18px;
    flex-flow: row nowrap;
    height: 60px;
    align-items: center;
    gap: 8px;
`;

export const Input = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.palette.text[2],
}))`
    flex: 1;
    color: ${({ theme }) => theme.palette.text[0]};
    font-size: ${({ theme }) => theme.text.normal.fontSize.md};
    font-family: ${({ theme }) => theme.text.normal.font.medium};
`;
