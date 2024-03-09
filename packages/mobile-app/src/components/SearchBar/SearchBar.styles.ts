import styled, { css } from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { createStyledIcon } from '~/utils/createStyledIcon';

export const SearchIcon = createStyledIcon(
    Icon,
    {
        name: 'search',
        size: 35,
        color: '#CBCACA',
    },
    css`
        margin: 0 10px;
    `,
);

export const InputWrapper = styled.View`
    background: #f3f3f3;
    border-radius: ${({ theme }) => theme.border.radiusBig};
    padding: 0 10px;
    flex-flow: row nowrap;
    height: 60px;
    align-items: center;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#CBCACA',
})`
    flex: 1;
    color: #777;
    font-size: 20px;
`;
