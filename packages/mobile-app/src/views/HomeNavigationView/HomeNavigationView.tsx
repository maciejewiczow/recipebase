import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Wrapper } from './HomeNavigationView.styles';
import { HomeIcon, HomeView } from './HomeView';
import {
    SearchByIngredientIcon,
    SearchByIngredientView,
} from './SearchByIngredientView';
import { SettingsView, SettingsIcon } from './SettingsView';
import { BottomTabBar } from '~/components/BottomTabBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '~/RootNavigation';
import { CreateIcon } from '../CreateRecipeView';

export type HomeTabNavigationParams = {
    Home: undefined;
    CreateStub: undefined;
    SearchByIngrediend: undefined;
    Settings: undefined;
};

const Tab = createBottomTabNavigator<HomeTabNavigationParams>();

export const HomeNavigationView: React.FC<
    NativeStackScreenProps<RootStackParams, 'HomeTabNavigator'>
> = ({ navigation }) => (
    <Wrapper>
        <Tab.Navigator
            tabBar={BottomTabBar}
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeView}
                options={{
                    tabBarIcon: HomeIcon,
                    tabBarLabel: 'Home',
                }}
            />
            <Tab.Screen
                name="SearchByIngrediend"
                component={SearchByIngredientView}
                options={{
                    tabBarIcon: SearchByIngredientIcon,
                    tabBarLabel: 'By ingredient',
                }}
            />
            <Tab.Screen
                name="CreateStub"
                listeners={{
                    tabPress: e => {
                        e.preventDefault();
                        navigation.navigate('CreateRecipe');
                    },
                }}
                options={{
                    tabBarIcon: CreateIcon,
                    tabBarLabel: 'Create',
                }}
            >
                {() => null}
            </Tab.Screen>
            <Tab.Screen
                name="Settings"
                component={SettingsView}
                options={{
                    tabBarIcon: SettingsIcon,
                    tabBarLabel: 'Settings',
                }}
            />
        </Tab.Navigator>
    </Wrapper>
);
