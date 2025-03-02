import styled from 'styled-components/native';

export const Wrapper = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    flex: 1;
    height: 100px;
    background: white;
    padding: 12px 8px;
`;

export const HeaderText = styled.View`
    color: ${({ theme }) => theme.palette.primary[0]};
    font-size: 32px;
`;

export const Files = styled.ScrollView`
    flex: 1;
`;

export const Bottom = styled.View`
    flex: 1;
    height: 100px;
`;
