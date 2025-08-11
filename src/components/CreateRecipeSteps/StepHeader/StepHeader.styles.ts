import styled from 'styled-components/native';
import { HeadingBase } from '~/components/Text';

export const paddingPx = 16;

export const Wrapper = styled.View<{ bottomInset: number }>`
    background: ${({ theme }) => theme.palette.background[0]};
    padding: ${({ bottomInset }) => bottomInset + paddingPx}px;
`;

export const IconBackWrapper = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    z-index: 20;
`;

export const Title = styled(HeadingBase)`
    font-size: ${({ theme }) => theme.text.heading.fontSize.xl};
    text-align: center;
    pointer-events: none;
`;
