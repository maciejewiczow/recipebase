import React from 'react';
import { HorizontalLine, LineWrapper, OrText, Wrapper } from './Import.styles';
import { Button } from '~/components/Button';
import { useNavigation } from '@react-navigation/native';
import { StepperNavigation } from '~/components/Stepper';

export const Import: React.FC = () => {
    const navigation = useNavigation<StepperNavigation>();

    return (
        <Wrapper>
            <Button variant="primary">Import from a website</Button>
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
