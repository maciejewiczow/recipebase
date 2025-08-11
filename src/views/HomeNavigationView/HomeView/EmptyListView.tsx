import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '~/RootNavigation';
import { HomeTabNavigationParams } from '../HomeNavigationView';
import { EmptyListTitle, EmptyListWrapper, PlusIcon, RecipeIcon } from './HomeView.styles';

export const EmptyListView: React.FC = () => {
    const navigation = useNavigation<NavigationProp<HomeTabNavigationParams & RootStackParams>>();

    return (
        <EmptyListWrapper onPress={() => navigation.navigate('CreateRecipe')}>
            <RecipeIcon />
            <EmptyListTitle>Tap to create your first recipe</EmptyListTitle>
            <PlusIcon />
        </EmptyListWrapper>
    );
};
