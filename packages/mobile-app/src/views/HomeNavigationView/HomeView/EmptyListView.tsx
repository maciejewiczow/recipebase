import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { EmptyListTitle, EmptyListSubtitle, EmptyListWrapper, RecipeIcon } from './HomeView.styles';
import { HomeTabNavigationParams } from '../HomeNavigationView';
import { RootStackParams } from '~/RootNavigation';

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
