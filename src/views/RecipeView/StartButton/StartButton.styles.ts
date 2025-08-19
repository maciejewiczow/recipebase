import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { TextBase } from '~/components/Text';

export const Wrapper = styled(Animated.View)`
    position: absolute;
    bottom: 20px;
    left: 16px;
    right: 16px;
    transform-origin: center center;
`;

export const ShadowContainer = styled(Animated.View)`
    border-radius: 45px;
`;

export const Background = styled.Pressable`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const Content = styled(Animated.View)`
    flex: 1;
    transform-origin: center center;
    padding: 18px;
    pointer-events: none;
`;

export const Text = styled(TextBase).attrs({
    fontWeight: 'medium',
})`
    text-align: center;
    color: ${({ theme }) => theme.palette.background[1]};
`;
