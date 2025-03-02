import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
    FadeIn,
    FadeOut,
    interpolateColor,
    useAnimatedStyle,
    useDerivedValue,
    withTiming,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import { CheckmarkIcon, Wrapper } from './Checkbox.styles';

interface CheckboxProps {
    checked?: boolean;
    style?: StyleProp<ViewStyle>;
}

const animationDuration = 300;

export const Checkbox: React.FC<CheckboxProps> = ({ checked, style }) => {
    const progress = useDerivedValue(() => withTiming(checked ? 1 : 0, { duration: animationDuration }));
    const theme = useTheme();

    const animatedStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(progress.value, [0, 1], ['transparent', theme.palette.primary[0]]),
    }));

    return (
        <Wrapper style={[style, { borderColor: theme.palette.primary[0] }, animatedStyle]}>
            {checked && (
                <Animated.View
                    entering={FadeIn.duration(animationDuration)}
                    exiting={FadeOut.duration(animationDuration)}
                >
                    <CheckmarkIcon />
                </Animated.View>
            )}
        </Wrapper>
    );
};
