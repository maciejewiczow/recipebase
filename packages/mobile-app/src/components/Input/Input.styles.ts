import styled, { css } from 'styled-components/native';

export const Wrapper = styled.View``;

export const inputStyles = css`
    border-radius: ${({ theme }) => theme.border.radiusBig};
    background: ${({ theme }) => theme.palette.background[4]};
    padding: 14px 20px;
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

export const Label = styled.Text`
    font-size: 13px;
    color: #8f8f8f;
    margin-bottom: 8px;
`;
