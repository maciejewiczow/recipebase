import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '~/components/Button';
import { RootStackParams } from '~/RootNavigation';
import { AppTitle, Background, Gradient } from '../SplashView/SplashView.styles';
import { TopButton } from './SelectDatabaseView.styles';

export const SelectDatabaseView: React.FC<NativeStackScreenProps<RootStackParams, 'SelectDatabase'>> = ({
    navigation,
}) => (
    <Background>
        <Gradient>
            <AppTitle>Recipebase</AppTitle>
            <TopButton
                variant="primary"
                onPress={() => navigation.navigate('SelectMethodModal', {
                        selectWhat: 'directory',
                    })
                }
            >
                Create new database
            </TopButton>
            <Button
                variant="secondary-outline"
                onPress={() => navigation.navigate('SelectMethodModal', {
                        selectWhat: 'file',
                    })
                }
            >
                Open existing one
            </Button>
        </Gradient>
    </Background>
);
