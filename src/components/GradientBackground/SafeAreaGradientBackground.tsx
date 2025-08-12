import React from 'react';
import { LinearGradientProps } from 'react-native-linear-gradient';
import { GradientBackground, SafeAreaView } from './GradientBackground.styles';

export const SafeAreaGradientBackground: React.FC<Omit<LinearGradientProps, 'colors'>> = ({
    children,
    style,
    ...props
}) => (
    <GradientBackground {...props}>
        <SafeAreaView
            style={style}
            mode="margin"
        >
            {children}
        </SafeAreaView>
    </GradientBackground>
);
