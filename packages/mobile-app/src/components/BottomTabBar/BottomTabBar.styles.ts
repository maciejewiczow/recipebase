import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import { TextBase } from '../Text';

export const Wrapper = styled.View`
    height: 70px;
    flex-flow: row nowrap;
    background: ${({ theme }) => theme.palette.background[1]};
`;

export const IconWrapper = styled(Pressable)`
    padding: 14px 10px;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Text = styled(TextBase)<{ focused?: boolean }>`
    color: ${({ focused, theme }) => (focused ? theme.palette.primary[2] : theme.palette.text[0])};
    font-family: ${({ theme }) => theme.text.normal.font.bold};
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.text.normal.fontSize['2xs']};
    margin-top: 5px;
`;
