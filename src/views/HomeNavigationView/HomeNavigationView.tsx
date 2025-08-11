import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabBar } from '~/components/BottomTabBar';
import { RootStackParams } from '~/RootNavigation';
import { CreateIcon } from '../CreateRecipeView';
import { HomeIcon, HomeView } from './HomeView';
import { SearchByIngredientIcon, SearchByIngredientView } from './SearchByIngredientView';
import { Wrapper } from './HomeNavigationView.styles';

export type HomeTabNavigationParams = {
    Home: undefined;
    CreateStub: undefined;
    SearchByIngrediend: undefined;
    Settings: undefined;
};

const Tab = createBottomTabNavigator<HomeTabNavigationParams>();

export const HomeNavigationView: React.FC<NativeStackScreenProps<RootStackParams, 'HomeTabNavigator'>> = ({
    navigation,
}) => (
    <Wrapper>
        <Tab.Navigator
            tabBar={props => <BottomTabBar {...props} />}
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
                name="CreateStub"
                listeners={{
                    tabPress: e => {
                        e.preventDefault();
                        navigation.navigate('CreateRecipe');
                    },
                }}
                options={{
                    tabBarIcon: props => <CreateIcon {...props} />,
                    tabBarLabel: 'Add recipe',
                }}
            >
                {() => null}
            </Tab.Screen>
            <Tab.Screen
                name="SearchByIngrediend"
                component={SearchByIngredientView}
                options={{
                    tabBarIcon: SearchByIngredientIcon,
                    tabBarLabel: 'By ingredient',
                }}
            />
        </Tab.Navigator>
    </Wrapper>
);
