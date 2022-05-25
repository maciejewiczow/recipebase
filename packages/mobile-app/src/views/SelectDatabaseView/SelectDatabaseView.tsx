import React from 'react';
import { ButtonVariant, Button } from 'recipebase/src/Components/Button';
import { Background, AppTitle, Gradient } from '../SplashView/SplashView.styles';
import { Buttons, TopButton } from './SelectDatabaseView.styles';

export const SelectDatabaseView: React.FC = () => (
    // Wrong typings
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Background>
        <Gradient>
            <AppTitle>Recipebase</AppTitle>
            <TopButton variant={ButtonVariant.primary}>Create new database</TopButton>
            <Button variant={ButtonVariant.secondaryOutline}>Open existing</Button>
        </Gradient>
    </Background>
);
