import React, { useEffect } from 'react';
import { useRootStore } from 'recipebase/src/RootStoreContext';
import { Background, AppTitle, Gradient, Loader } from './SplashView.styles';

export const SplashView: React.FC = () => {
    const root = useRootStore();

    useEffect(() => {
        root.initalize();
    }, [root]);

    return (
        // Wrong typings
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Background>
            <Gradient>
                <AppTitle>Recipebase</AppTitle>
                <Loader />
            </Gradient>
        </Background>
    );
};
