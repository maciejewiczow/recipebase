import { createNavigationContainerRef, ParamListBase, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GDriveFilePickerViewProps } from './views/GDriveFilePickerView/ViewProps';
import { HomeTabNavigationParams } from './views/HomeNavigationView/HomeNavigationView';
import { RecipeViewProps } from './views/RecipeView/ViewProps';
import { SelecMethodModalViewRouteProps } from './views/SelectionMethodModalView/ViewProps';

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
};

export const Stack = createNativeStackNavigator<RootStackParams>();

export const rootNavigationRef = createNavigationContainerRef<RootStackParams>();

export default class RootNavigation {
    static navigate: typeof rootNavigationRef.navigate = (...args) => {
        if (rootNavigationRef.isReady())
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
