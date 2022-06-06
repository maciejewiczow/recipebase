import React, { useEffect } from 'react';
import init from 'recipebase/src/store/Initalize';
import { Background, AppTitle, Gradient, Loader } from './SplashView.styles';

export const SplashView: React.FC = () => {
    useEffect(() => {
        init.initalize();
    }, []);

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
