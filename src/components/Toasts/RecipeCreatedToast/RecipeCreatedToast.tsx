import React from 'react';
import { Pressable } from 'react-native';
import { ToastConfigParams } from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { ToastIcon } from './ToastIcon';
import { shadowStyles } from '../common.styles';
import { LinkText, Text, TextWrapper, Wrapper } from './RecipeCreatedToast.styles';

export interface RecipeCreatedToastParams {
    createdRecipeId: number;
}

export const RecipeCreatedToast: React.FC<ToastConfigParams<RecipeCreatedToastParams>> = ({
    props: { createdRecipeId },
}) => {
    const navigation = useNavigation();

    return (
        <Pressable
            onPress={() => {
                navigation.navigate('Recipe', { recipeId: createdRecipeId });
            }}
        >
            <Wrapper style={shadowStyles.shadow}>
                <ToastIcon />
                <TextWrapper>
                    <Text>The recipe was succesfully saved to your handbook</Text>
                    <LinkText>View recipe</LinkText>
                </TextWrapper>
            </Wrapper>
        </Pressable>
    );
};
