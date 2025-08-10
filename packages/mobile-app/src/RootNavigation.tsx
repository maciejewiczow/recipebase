import Config from 'react-native-config';
import { useFlipper } from '@react-navigation/devtools';
import {
    createNavigationContainerRef,
    NavigationContainer,
    NavigationProp,
    ParamListBase,
    StackActions,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as views from '~/views';
import { StepHeader } from './components/CreateRecipeSteps/StepHeader';
import { StepperSubNavigator } from './components/Stepper/Stepper';
import { AddStepViewRouteProps, StepNames } from './views/CreateRecipeView';
import { AddIngredientViewRouteProps } from './views/CreateRecipeView/AddIngredientView/AddIngredientView';
import { GDriveFilePickerViewProps } from './views/GDriveFilePickerView/ViewProps';
import { HomeTabNavigationParams } from './views/HomeNavigationView/HomeNavigationView';
import { RecipeViewProps } from './views/RecipeView/ViewProps';
import { SelecMethodModalViewRouteProps } from './views/SelectionMethodModalView/ViewProps';

export type ISubNavigator<T extends ParamListBase, K extends keyof T> =
    | {
          screen?: K;
          params?: T[K];
      }
    | undefined;

export type RootStackParams = {
    Splash: undefined;
    HomeTabNavigator: ISubNavigator<HomeTabNavigationParams, keyof HomeTabNavigationParams>;
    SelectDatabase: undefined;
    SelectMethodModal: SelecMethodModalViewRouteProps;
    GDriveFilePicker: GDriveFilePickerViewProps;
    Recipe: RecipeViewProps;
    CreateRecipe: StepperSubNavigator<StepNames>;
    AddIngredientView: AddIngredientViewRouteProps;
    AddStepView: AddStepViewRouteProps;
    AddStepIngredientView: undefined;
    ImportRecipeView: undefined;
    Settings: undefined;
};

export type RootNavigationProp = NavigationProp<RootStackParams>;

export const Stack = createNativeStackNavigator<RootStackParams>();

export const rootNavigationRef = createNavigationContainerRef<RootStackParams>();

export class RootNavigation {
    static navigate: typeof rootNavigationRef.navigate = (...args) => {
        if (rootNavigationRef.isReady()) {
            // @ts-expect-error typescript is paranoid
            rootNavigationRef.navigate(...args);
        }
    };

    static replace = <Route extends keyof RootStackParams = keyof RootStackParams>(
        name: Route,
        params?: RootStackParams[Route],
    ) => {
        if (rootNavigationRef.isReady()) {
            rootNavigationRef.dispatch(StackActions.replace(name, params));
        }
    };

    static goBack = () => {
        if (rootNavigationRef.isReady()) {
            rootNavigationRef.goBack();
        }
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
                <Stack.Screen
                    name="Splash"
                    component={views.SplashView}
                />
                <Stack.Screen
                    name="HomeTabNavigator"
                    component={views.HomeNavigationView}
                />
                <Stack.Screen
                    name="SelectDatabase"
                    component={views.SelectDatabaseView}
                    options={{ animation: 'none' }}
                />
                <Stack.Screen
                    name="GDriveFilePicker"
                    component={views.GDriveFilePickerView}
                />
                <Stack.Screen
                    name="Recipe"
                    component={views.RecipeView}
                />
                <Stack.Screen
                    name="Settings"
                    component={views.SettingsView}
                />
                <Stack.Group
                    screenOptions={{
                        presentation: 'modal',
                        animation: 'slide_from_bottom',
                    }}
                >
                    <Stack.Screen
                        name="SelectMethodModal"
                        component={views.SelectionMethodModalView}
                    />
                    <Stack.Group
                        screenOptions={{
                            headerShown: false,
                            headerShadowVisible: false,
                        }}
                    >
                        <Stack.Screen
                            name="CreateRecipe"
                            component={views.CreateRecipeView}
                            options={{
                                title: 'Create recipe',
                                headerShown: true,
                                header: StepHeader,
                            }}
                        />
                        <Stack.Screen
                            name="AddIngredientView"
                            component={views.AddIngredientView}
                        />
                        <Stack.Screen
                            name="AddStepView"
                            component={views.AddStepView}
                        />
                        <Stack.Screen
                            name="AddStepIngredientView"
                            component={views.AddStepIngredientView}
                        />
                        <Stack.Screen
                            name="ImportRecipeView"
                            component={views.ImportRecipeView}
                        />
                    </Stack.Group>
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
