import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ButtonVariant, Button } from 'recipebase/src/components/Button';
import { RootStackParams } from 'recipebase/src/RootNavigation';
import { Background, AppTitle, Gradient } from '../SplashView/SplashView.styles';
import { TopButton } from './SelectDatabaseView.styles';

export const SelectDatabaseView: React.FC<NativeStackScreenProps<RootStackParams, 'SelectDatabase'>> = ({ navigation }) => (
    // Wrong typings
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Background>
        <Gradient>
            <AppTitle>Recipebase</AppTitle>
            <TopButton
                variant={ButtonVariant.primary}
                onPress={() => navigation.navigate('SelectMethodModal', { selectWhat: 'directory' })}
            >
                Create new database
            </TopButton>
            <Button
                variant={ButtonVariant.secondaryOutline}
                onPress={() => navigation.navigate('SelectMethodModal', { selectWhat: 'file' })}
            >
                Open existing one
            </Button>
        </Gradient>
    </Background>
);
