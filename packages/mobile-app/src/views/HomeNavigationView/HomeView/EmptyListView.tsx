import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { EmptyListTitle, EmptyListSubtitle, EmptyListWrapper } from './HomeView.styles';
import { HomeTabNavigationParams } from '../HomeNavigationView';

export const EmptyListView: React.FC = () => {
    const navigation = useNavigation<NavigationProp<HomeTabNavigationParams>>();

    return (
        <EmptyListWrapper onPress={() => navigation.navigate('Create')}>
            <EmptyListTitle>No recipes to show</EmptyListTitle>
            <EmptyListSubtitle>Tap to create your first recipe</EmptyListSubtitle>
        </EmptyListWrapper>
    );
};
