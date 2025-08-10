import React from 'react';
import { ScrollViewProps } from 'react-native';
import { FullSizeScrollView, GradientBackground } from './GradientBackground.styles';

export const ScrollableGradientBackground: React.FC<ScrollViewProps> = ({ children, ...props }) => (
    <GradientBackground>
        <FullSizeScrollView {...props}>{children}</FullSizeScrollView>
    </GradientBackground>
);
