import styled from 'styled-components/native';

export const ListHeader = styled.Text`
    font-size: 16px;
    color: #777;
    margin-bottom: 8px;
`;

export const ListWrapper = styled.View`
    gap: 8px;
    background: white;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: ${({ theme }) => theme.border.radiusBig};
`;
