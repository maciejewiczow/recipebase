import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from '~/components/Button';
import { StepperNavigation } from '~/components/Stepper';
import { HorizontalLine, LineWrapper, OrText, Wrapper } from './Import.styles';

export const Import: React.FC = () => {
    const navigation = useNavigation<StepperNavigation>();

    return (
        <Wrapper>
            <Button
                variant="primary"
                onPress={() => navigation.navigate('ImportRecipeView')}
            >
                Import from a website
            </Button>
            <LineWrapper>
                <HorizontalLine />
                <OrText>or</OrText>
                <HorizontalLine />
            </LineWrapper>
            <Button
                onPress={() => navigation.navigate('NameAndPhoto')}
                variant="secondary"
            >
                Add manually
            </Button>
        </Wrapper>
    );
};
