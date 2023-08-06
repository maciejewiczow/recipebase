import {
    createNavigationContainerRef,
    NavigationContainer,
    NavigationProp,
    ParamListBase,
    StackActions,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GDriveFilePickerViewProps } from './views/GDriveFilePickerView/ViewProps';
import { HomeTabNavigationParams } from './views/HomeNavigationView/HomeNavigationView';
import { RecipeViewProps } from './views/RecipeView/ViewProps';
import { SelecMethodModalViewRouteProps } from './views/SelectionMethodModalView/ViewProps';
import * as views from '~/views';
import { useFlipper } from '@react-navigation/devtools';
import Config from 'react-native-config';
import { ViewProps } from './views/CreateRecipeView/AddIngredientView/AddIngredientView';

export interface ISubNavigator<T extends ParamListBase, K extends keyof T> {
    screen: K;
    params?: T[K];
}

export type RootStackParams = {
    Splash: undefined;
    HomeTabNavigator: ISubNavigator<HomeTabNavigationParams, keyof HomeTabNavigationParams>;
    SelectDatabase: undefined;
    SelectMethodModal: SelecMethodModalViewRouteProps;
    GDriveFilePicker: GDriveFilePickerViewProps;
    Recipe: RecipeViewProps;
    CreateRecipe: undefined;
    AddIngredientView: ViewProps;
    AddStepView: undefined;
};

export type RootNavigationProp = NavigationProp<RootStackParams>;

export const Stack = createNativeStackNavigator<RootStackParams>();

export const rootNavigationRef = createNavigationContainerRef<RootStackParams>();

export default class RootNavigation {
    static navigate: typeof rootNavigationRef.navigate = (...args) => {
        if (rootNavigationRef.isReady())
            // @ts-expect-error typescript is paranoid
            rootNavigationRef.navigate(...args);
    };

    static replace = <Route extends keyof RootStackParams = keyof RootStackParams>(name: Route, params?: RootStackParams[Route]) => {
        if (rootNavigationRef.isReady())
            rootNavigationRef.dispatch(StackActions.replace(name as string, params));
    };

    static goBack = () => {
        if (rootNavigationRef.isReady())
            rootNavigationRef.goBack();
    };
}

export const RootNavigationComponent: React.FC = () => {
    useFlipper(Config.DEBUG ? rootNavigationRef : { current: null });

    return (
        <NavigationContainer ref={rootNavigationRef}>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Screen name="Splash" component={views.SplashView} />
                <Stack.Screen name="HomeTabNavigator" component={views.HomeNavigationView} />
                <Stack.Screen name="SelectDatabase" component={views.SelectDatabaseView} options={{ animation: 'none' }} />
                <Stack.Screen name="GDriveFilePicker" component={views.GDriveFilePickerView} />
                <Stack.Screen name="Recipe" component={views.RecipeView} />
                <Stack.Group screenOptions={{ presentation: 'modal', animation: 'slide_from_bottom' }}>
                    <Stack.Screen name="SelectMethodModal" component={views.SelectionMethodModalView} />
                    <Stack.Group
                        screenOptions={{
                            headerShown: true,
                            headerShadowVisible: false,
                        }}
                    >
                        <Stack.Screen
                            name="CreateRecipe"
                            component={views.CreateRecipeView}
                            options={{
                                title: 'Create recipe',
                            }}
                        />
                        <Stack.Screen
                            name="AddIngredientView"
                            component={views.AddIngredientView}
                            options={{
                                title: 'Add ingredient',
                            }}
                        />
                        <Stack.Screen
                            name="AddStepView"
                            component={views.AddStepView}
                            options={{
                                title: 'Add step',
                            }}
                        />
                    </Stack.Group>
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
