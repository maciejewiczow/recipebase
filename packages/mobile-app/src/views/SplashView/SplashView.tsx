import React, { useEffect } from 'react';
import { useRootStore } from '~/RootStoreContext';
import { Background, AppTitle, Gradient, Loader } from './SplashView.styles';

export const SplashView: React.FC = () => {
    const root = useRootStore();

    useEffect(() => {
        root.initalize();
    }, [root]);

    return (
        <Background>
            <Gradient>
                <AppTitle>Recipebase</AppTitle>
                <Loader />
            </Gradient>
        </Background>
    );
};
