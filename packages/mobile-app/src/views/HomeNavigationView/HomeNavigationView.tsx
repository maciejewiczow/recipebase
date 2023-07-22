import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Wrapper } from './HomeNavigationView.styles';
import { HomeIcon, HomeView } from './HomeView';
import { CreateView, CreateIcon } from './CreateView';
import { SearchByIngredientIcon, SearchByIngredientView } from './SearchByIngredientView';
import { SettingsView, SettingsIcon } from './SettingsView';
import { BottomTabBar } from '~/components/BottomTabBar';

export type HomeTabNavigationParams = {
    Home: undefined;
    Create: CreateViewRouteProps;
    SearchByIngrediend: undefined;
    Settings: undefined;
};

const Tab = createBottomTabNavigator<HomeTabNavigationParams>();

export const HomeNavigationView: React.FC = () => (
    <Wrapper>
        <Tab.Navigator tabBar={Navigation} initialRouteName="Home" screenOptions={{ headerShown: false }} >
            <Tab.Screen
                name="Home"
                component={HomeView}
                options={{
                    tabBarIcon: HomeIcon,
                    tabBarLabel: 'Home',
                }} />
            <Tab.Screen
                name="SearchByIngrediend"
                component={SearchByIngredientView}
                options={{
                    tabBarIcon: SearchByIngredientIcon,
                    tabBarLabel: 'By ingredient',
                }}
            />
            <Tab.Screen
                name="Create"
                component={CreateView}
                initialParams={{ isEdit: false }}
                options={{
                    tabBarIcon: CreateIcon,
                    tabBarLabel: 'Create',
                }}
            />
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
