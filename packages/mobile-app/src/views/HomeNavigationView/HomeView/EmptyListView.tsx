import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '~/RootNavigation';
import { HomeTabNavigationParams } from '../HomeNavigationView';
import { EmptyListSubtitle, EmptyListTitle, EmptyListWrapper, RecipeIcon } from './HomeView.styles';

export const EmptyListView: React.FC = () => {
    const navigation = useNavigation<NavigationProp<HomeTabNavigationParams & RootStackParams>>();

    return (
        <EmptyListWrapper onPress={() => navigation.navigate('CreateRecipe')}>
            <RecipeIcon />
            <EmptyListTitle>No recipes to show</EmptyListTitle>
            <EmptyListSubtitle>Tap to create your first recipe</EmptyListSubtitle>
        </EmptyListWrapper>
    );
};
