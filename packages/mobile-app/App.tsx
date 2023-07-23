import 'reflect-metadata';
import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import { MenuProvider } from 'react-native-popup-menu';
import { darkTheme, lightTheme } from './src/theme';
import { rootStore, RootStoreContext } from './src/RootStoreContext';
import { RootNavigationComponent } from '~/RootNavigation';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import Config from 'react-native-config';

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                {Config.DEBUG && <FlipperAsyncStorage />}
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                <MenuProvider>
                    <RootStoreContext.Provider value={rootStore}>
                        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                            <RootNavigationComponent />
                        </ThemeProvider>
                    </RootStoreContext.Provider>
                </MenuProvider>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default App;
