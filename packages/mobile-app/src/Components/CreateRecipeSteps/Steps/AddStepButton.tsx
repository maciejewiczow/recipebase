import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { RootStackParams } from '~/RootNavigation';
import { AddStepButton as AddStepButtonStyled } from './Steps.styles';
import { AddIcon } from '../common.styles';

interface AddIngredientButtonProps {
    targetSectionId: number;
}

export const AddStepButton: React.FC<AddIngredientButtonProps> = ({ targetSectionId }) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    return (
        <AddStepButtonStyled
            onPress={() => navigation.navigate('AddStepView', { targetSectionId })}
        >
            <AddIcon />  Add step
        </AddStepButtonStyled>
    );
};
