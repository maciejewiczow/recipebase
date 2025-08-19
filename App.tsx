import 'reflect-metadata';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { RootNavigationComponent } from '~/RootNavigation';
import { rootStore, RootStoreContext } from './src/RootStoreContext';
import { lightTheme } from './src/theme';

export const App = () => (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider style={{ flex: 1 }}>
            <StatusBar style="dark" />
            <ThemeProvider theme={lightTheme}>
                <MenuProvider>
                    <RootStoreContext.Provider value={rootStore}>
                        <RootNavigationComponent />
                    </RootStoreContext.Provider>
                </MenuProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    </GestureHandlerRootView>
);
