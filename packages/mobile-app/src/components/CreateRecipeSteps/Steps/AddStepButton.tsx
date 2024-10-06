import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '~/RootNavigation';
import { AddIcon } from '../common.styles';
import { AddStepButton as AddStepButtonStyled } from './Steps.styles';

interface AddIngredientButtonProps {
    targetSectionId: number;
}

export const AddStepButton: React.FC<AddIngredientButtonProps> = ({ targetSectionId }) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    return (
        <AddStepButtonStyled onPress={() => navigation.navigate('AddStepView', { targetSectionId })}>
            <AddIcon /> Add step
        </AddStepButtonStyled>
    );
};
