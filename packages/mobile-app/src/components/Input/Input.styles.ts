import styled, { css } from 'styled-components/native';

export const Wrapper = styled.View`
`;

export const inputStyles = css`
    border-radius: ${({ theme }) => theme.border.radius};
    border: 1px solid #ACACAC;
    background: white;
    padding: 14px 20px;
    font-size: 18px;
    color: #000;
`;

export const TextInput = styled.TextInput.attrs({
    placeholderTextColor: '#bbb',
    textAlignVertical: 'top',
})`
    ${inputStyles}
`;

export const Label = styled.Text`
    font-size: 13px;
    color: #8F8F8F;
    margin-bottom: 8px;
`;
