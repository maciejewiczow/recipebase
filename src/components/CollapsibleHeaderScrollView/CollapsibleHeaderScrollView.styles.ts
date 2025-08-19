import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const Header = styled(Animated.View)<{ maxHeight: number }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: ${({ maxHeight }) => maxHeight}px;
    z-index: 20;
    transform-origin: top center;
    overflow: hidden;
`;

export const HeaderContent = styled(Animated.View)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const BlurViewContent = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 30;
`;

export const ScrollViewContent = styled(Animated.View)<{ minHeaderHeight: number; maxHeaderHeight: number }>`
    margin-bottom: ${({ minHeaderHeight, maxHeaderHeight }) => maxHeaderHeight}px;
`;
