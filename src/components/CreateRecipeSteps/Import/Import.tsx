import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from '~/components/Button';
import { StepperNavigation } from '~/components/Stepper';
import { ImportCakeSvg } from '~/components/Svg/ImportCakeSvg';
import { ButtonsWrapper, CakeWrapper, OrText, Wrapper } from './Import.styles';

export const Import: React.FC = () => {
    const navigation = useNavigation<StepperNavigation>();

    return (
        <Wrapper>
            <CakeWrapper>
                <ImportCakeSvg />
            </CakeWrapper>
            <ButtonsWrapper>
                <Button
                    variant="primary"
                    onPress={() => navigation.navigate('ImportRecipeView')}
                >
                    Import from a website
                </Button>
                <OrText>or</OrText>
                <Button
                    onPress={() => navigation.navigate('NameAndPhoto')}
                    variant="outline"
                >
                    Add manually
                </Button>
            </ButtonsWrapper>
        </Wrapper>
    );
};
