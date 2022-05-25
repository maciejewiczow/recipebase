import { createNavigationContainerRef, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParams = {
    Splash: undefined;
    Home: undefined;
    SelectDatabase: undefined;
};

export const Stack = createNativeStackNavigator<RootStackParams>();

export const rootNavigationRef = createNavigationContainerRef<RootStackParams>();

export default class RootNavigation {
    static navigate: typeof rootNavigationRef.navigate = (...args) => {
        if (rootNavigationRef.isReady())
        // @ts-ignore
            rootNavigationRef.navigate(...args);
    };

    static replace = (name: string, params?: Record<string, any>) => {
        if (rootNavigationRef.isReady())
            rootNavigationRef.dispatch(StackActions.replace(name, params));
    };
}
