import styled from 'styled-components/native';

export const Wrapper = styled.View`
    height: 70px;
    flex-flow: row nowrap;
    background: white;
`;

export const IconWrapper = styled.TouchableOpacity`
    padding: 14px 10px;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Text = styled.Text<{ focused?: boolean }>`
    color: ${({ focused, theme }) =>
        focused ? theme.palette.primaryAccent : '#C6C6C6'};
    font-size: 11px;
    margin-top: 5px;
`;
