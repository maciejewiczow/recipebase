import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { RootStackParams } from '~/RootNavigation';
import { AddIcon, AddIngredientButton as AddIngredientButtonStyled } from './Ingredients.styles';

interface AddIngredientButtonProps {
    targetSectionId: number;
}

export const AddIngredientButton: React.FC<AddIngredientButtonProps> = ({ targetSectionId }) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    return (
        <AddIngredientButtonStyled
            onPress={() => navigation.navigate('AddIngredientView', { targetSectionId })}
        >
            <AddIcon />  Add ingredient
        </AddIngredientButtonStyled>
    );
};
