import styled from 'styled-components/native';

export const Wrapper = styled.View`
    width: 81px;
    height: 80px;
`;

export const LoaderWrapper = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    justify-content: center;
    align-items: center;
`;

export const Loader = styled.ActivityIndicator.attrs(({ theme }) => ({
    color: theme.palette.background[1],
    size: 35,
}))``;
