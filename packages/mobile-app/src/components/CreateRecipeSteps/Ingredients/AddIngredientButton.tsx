import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { RootStackParams } from '~/RootNavigation';
import { AddIcon, AddListItemButton } from '../common.styles';

interface AddIngredientButtonProps {
    targetSectionId: number;
}

export const AddIngredientButton: React.FC<AddIngredientButtonProps> = ({
    targetSectionId,
}) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    return (
        <AddListItemButton
            onPress={() =>
                navigation.navigate('AddIngredientView', { targetSectionId })
            }
        >
            <AddIcon /> Add ingredient
        </AddListItemButton>
    );
};
