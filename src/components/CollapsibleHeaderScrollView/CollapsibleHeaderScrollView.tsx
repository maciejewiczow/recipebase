import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    measure,
    runOnJS,
    SharedValue,
    useAnimatedReaction,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
} from 'react-native-reanimated';
import { BlurView } from '@danielsaraldi/react-native-blur-view';
import {
    BlurViewContent,
    Header,
    HeaderContent,
    ScrollViewContent,
} from './CollapsibleHeaderScrollView.styles';

interface CollapsibleHeaderScrollViewProps {
    scrollVerticalOffset: SharedValue<number>;
    maxHeight: number;
    minHeight: number;
    anmiationEndAt: number;
    children?: React.ReactNode;
    headerBlurredContent?: React.ReactNode;
    headerNonBlurredContent?: React.ReactNode;
    headerContentStyle?: StyleProp<ViewStyle>;
    blurViewContentContainerStyle?: StyleProp<ViewStyle>;
    headerBorderRadius?: number;
    blurRadius?: number;
    setIsAtEnd?: (val: boolean) => void;
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export const CollapsibleHeaderScrollView: React.FC<CollapsibleHeaderScrollViewProps> = ({
    scrollVerticalOffset,
    minHeight,
    maxHeight,
    anmiationEndAt,
    children,
    headerBlurredContent,
    headerNonBlurredContent,
    headerBorderRadius = 0,
    blurRadius = 8,
    blurViewContentContainerStyle,
    setIsAtEnd,
}) => {
    const ref = useAnimatedRef<Animated.ScrollView>();

    const isAtEnd = useSharedValue(false);

    const scrollHandler = useAnimatedScrollHandler(e => {
        scrollVerticalOffset.value = e.contentOffset.y;

        const measurement = measure(ref);

        if (measurement) {
            isAtEnd.value = Math.abs(e.contentOffset.y - (e.contentSize.height - measurement.height)) < 100;
        }
    });

    useAnimatedReaction(
        () => isAtEnd.value,
        () => {
            if (setIsAtEnd) {
                runOnJS(setIsAtEnd)(isAtEnd.value);
            }
        },
    );

    const scaleY = useDerivedValue(() => {
        const minScale = minHeight / maxHeight;

        return Math.max(
            interpolate(scrollVerticalOffset.value, [0, anmiationEndAt], [1, minScale], Extrapolation.EXTEND),
            minScale,
        );
    });

    const style = useAnimatedStyle(() => {
        const radius = interpolate(
            scrollVerticalOffset.value,
            [0, anmiationEndAt],
            [headerBorderRadius, 0],
            Extrapolation.CLAMP,
        );

        return {
            transform: [{ scaleY: scaleY.value }],
            borderBottomLeftRadius: radius,
            borderBottomRightRadius: radius,
        };
    });

    const contentStyle = useAnimatedStyle(() => ({
        transform: [{ scaleY: 1 / scaleY.value }],
    }));

    const scrollViewContentStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateY:
                    interpolate(
                        scrollVerticalOffset.value,
                        [0, anmiationEndAt],
                        [0, anmiationEndAt],
                        Extrapolation.CLAMP,
                    ) +
                    scaleY.value * maxHeight,
            },
        ],
    }));

    const blurViewStyle = useAnimatedStyle(() => ({
        opacity: interpolate(scrollVerticalOffset.value, [0, anmiationEndAt], [0, 1], Extrapolation.CLAMP),
    }));

    return (
        <>
            <Header
                maxHeight={maxHeight}
                style={style}
            >
                <HeaderContent style={contentStyle}>
                    {headerBlurredContent}
                    <AnimatedBlurView
                        style={[StyleSheet.absoluteFill, blurViewStyle]}
                        type="dark"
                        radius={blurRadius}
                    >
                        <BlurViewContent style={blurViewContentContainerStyle}>
                            {headerNonBlurredContent}
                        </BlurViewContent>
                    </AnimatedBlurView>
                </HeaderContent>
            </Header>
            <Animated.ScrollView
                ref={ref}
                onScroll={scrollHandler}
            >
                <ScrollViewContent
                    minHeaderHeight={minHeight}
                    maxHeaderHeight={maxHeight}
                    style={scrollViewContentStyle}
                >
                    {children}
                </ScrollViewContent>
            </Animated.ScrollView>
        </>
    );
};
