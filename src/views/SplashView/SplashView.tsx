import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRootStore } from '~/RootStoreContext';
import { AppTitle, Background, Gradient, Loader } from './SplashView.styles';

export const SplashView: React.FC = () => {
    const root = useRootStore();

    useEffect(() => {
        root.initalize();
    }, [root]);

    return (
        <Background>
            <StatusBar style="light" />
            <Gradient>
                <AppTitle>Recipebase</AppTitle>
                <Loader />
            </Gradient>
        </Background>
    );
};
