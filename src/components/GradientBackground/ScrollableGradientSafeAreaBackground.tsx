import React from 'react';
import { ScrollViewProps } from 'react-native';
import { FullSizeScrollView, GradientBackground, SafeAreaView } from './GradientBackground.styles';

export const ScrollableGradientSafeAreaBackground: React.FC<ScrollViewProps> = props => (
    <GradientBackground>
        <SafeAreaView mode="margin">
            <FullSizeScrollView {...props} />
        </SafeAreaView>
    </GradientBackground>
);
