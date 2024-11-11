import Animated from 'react-native-reanimated';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { createStyledIcon } from '~/utils/createStyledIcon';

const size = 26;

export const Wrapper = styled(Animated.View)`
    height: ${size}px;
    width: ${size}px;
    border-radius: ${size}px;
    border-width: 2px;
    align-items: center;
    justify-content: center;
`;

export const CheckmarkIcon = createStyledIcon(FeatherIcon, {
    name: 'check',
    color: 'white',
    size: size * 0.7,
});
