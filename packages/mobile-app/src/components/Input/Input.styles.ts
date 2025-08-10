import styled, { css } from 'styled-components/native';
import { TextBase } from '../Text';

export const Wrapper = styled.View``;

export const inputStyles = css`
    border-radius: ${({ theme }) => theme.border.radiusBig};
    background-color: ${({ theme }) => theme.palette.background[4]};
    padding: 16px;
    font-size: ${({ theme }) => theme.text.normal.fontSize.md};
    line-height: ${({ theme }) => theme.text.normal.lineHeight.md};
    font-family: ${({ theme }) => theme.text.normal.font.medium};
`;

export const InputWrapper = styled.View`
    flex-direction: row;
    gap: 12px;
    align-items: center;
`;

export const TextInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.palette.text[2],
    textAlignVertical: 'top',
}))`
    ${inputStyles}
    flex: 1;
`;

export const Label = styled(TextBase).attrs({
    fontWeight: 'medium',
})`
    margin-bottom: 8px;
`;
