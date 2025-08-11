import styled from 'styled-components/native';
import { HeadingBase } from '~/components/Text';

export const paddingPx = 16;

export const Wrapper = styled.View<{ topInset: number }>`
    background: ${({ theme }) => theme.palette.background[0]};
    padding: ${paddingPx}px;
    padding-top: ${({ topInset }) => topInset + paddingPx}px;
`;

export const Title = styled(HeadingBase)`
    font-size: ${({ theme }) => theme.text.heading.fontSize.xl};
    text-align: center;
    pointer-events: none;
`;
