import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '~/RootNavigation';
import { AddListItemButton, AddListItemButtonText } from '../common.styles';

interface AddIngredientButtonProps {
    targetSectionId: number;
    style?: StyleProp<ViewStyle>;
}

export const AddIngredientButton: React.FC<AddIngredientButtonProps> = ({ targetSectionId, style }) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    return (
        <AddListItemButton
            style={style}
            onPress={() => navigation.navigate('AddIngredientView', { targetSectionId })}
        >
            <AddListItemButtonText>Add ingredient</AddListItemButtonText>
        </AddListItemButton>
    );
};
