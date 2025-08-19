import React, { useEffect } from 'react';
import Animated, {
    interpolate,
    interpolateColor,
    useAnimatedProps,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import Svg, { Rect, RectProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';
import { useViewDimensions } from '~/utils/useViewDimensions';
import { Background, Content, ShadowContainer, Text, Wrapper } from './StartButton.styles';

const minHeight = 50;
const minWidth = 168;

const AnimatedRect = Animated.createAnimatedComponent(Rect);

interface StartButtonProps {
    isDocked: boolean;
    onPress?: () => void;
}

export const StartButton: React.FC<StartButtonProps> = ({ isDocked, onPress }) => {
    const transformProgress = useSharedValue(1);
    const [{ height, width }, onLayout] = useViewDimensions();
    const theme = useTheme();

    useEffect(() => {
        transformProgress.value = withSpring(isDocked ? 0 : 1, {
            damping: 13,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDocked]);

    const scaleX = useDerivedValue(() => interpolate(transformProgress.value, [0, 1], [1, minWidth / width]));
    const scaleY = useDerivedValue(() =>
        interpolate(transformProgress.value, [0, 1], [1, minHeight / height]),
    );

    const wrapperStyle = useAnimatedStyle(() => ({
        transform: [{ scaleX: scaleX.value }, { scaleY: scaleY.value }],
    }));

    const contentStyle = useAnimatedStyle(() => ({
        transform: [{ scaleX: 1 / scaleX.value }, { scaleY: 1 / scaleY.value }],
    }));

    const rectProps = useAnimatedProps<RectProps>(() => ({
        rx: (1 / scaleX.value) * parseInt(theme.border.radiusBig),
        ry: (1 / scaleY.value) * parseInt(theme.border.radiusBig),
    }));

    const shadowStyle = useAnimatedStyle(() => ({
        boxShadow: [
            {
                offsetX: 0,
                offsetY: 4,
                blurRadius: 36,
                color: interpolateColor(transformProgress.value, [0, 1], ['transparent', 'rgba(0,0,0,0.4)']),
            },
        ],
    }));

    return (
        <Wrapper
            style={wrapperStyle}
            onLayout={onLayout}
        >
            <ShadowContainer style={shadowStyle}>
                <Background onPress={onPress}>
                    <Svg
                        width="100%"
                        height="100%"
                    >
                        <AnimatedRect
                            width="100%"
                            height="100%"
                            x={0}
                            y={0}
                            fill={theme.palette.primary[0]}
                            animatedProps={rectProps}
                        />
                    </Svg>
                </Background>
                <Content style={contentStyle}>
                    <Text>Start cooking</Text>
                </Content>
            </ShadowContainer>
        </Wrapper>
    );
};
