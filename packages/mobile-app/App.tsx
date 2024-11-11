import 'reflect-metadata';
import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import Config from 'react-native-config';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import { ThemeProvider } from 'styled-components/native';
import { RootNavigationComponent } from '~/RootNavigation';
import { rootStore, RootStoreContext } from './src/RootStoreContext';
import { lightTheme } from './src/theme';

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                {Config.DEBUG && <FlipperAsyncStorage />}
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                {/* TODO: dark theme */}
                <ThemeProvider theme={/* isDarkMode ? darkTheme : */ lightTheme}>
                    <BottomSheetModalProvider>
                        <MenuProvider>
                            <RootStoreContext.Provider value={rootStore}>
                                <RootNavigationComponent />
                            </RootStoreContext.Provider>
                        </MenuProvider>
                    </BottomSheetModalProvider>
                </ThemeProvider>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default App;
