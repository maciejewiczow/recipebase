import { SafeAreaView as OriginalSafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { HeadingBase } from '~/components/Text';

export const paddingPx = 16;

export const Wrapper = styled.View`
    background: ${({ theme }) => theme.palette.background[0]};
    padding: ${paddingPx}px;
    padding-top: ${paddingPx}px;
`;

export const SafeAreaView = styled(OriginalSafeAreaView).attrs({
    edges: {
        top: 'additive',
        left: 'additive',
        right: 'additive',
        bottom: 'off',
    },
    mode: 'margin',
})``;

export const BackIconWrapper = styled.Pressable`
    position: absolute;
    padding: 24px;
    top: -12px;
    left: 0;
`;

export const Title = styled(HeadingBase)`
    font-size: ${({ theme }) => theme.text.heading.fontSize.xl};
    text-align: center;
    pointer-events: none;
`;
