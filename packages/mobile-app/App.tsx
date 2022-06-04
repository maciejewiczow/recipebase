import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { rootNavigationRef, Stack } from './src/RootNavigation';
import { darkTheme, lightTheme } from './src/theme';
import * as views from './src/views';

import 'reflect-metadata';

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <NavigationContainer ref={rootNavigationRef}>
                    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
                        <Stack.Group >
                            <Stack.Screen name="Splash" component={views.SplashView} />
                            <Stack.Screen name="HomeTabNavigator" component={views.HomeNavigationView} />
                            <Stack.Screen name="SelectDatabase" component={views.SelectDatabaseView} options={{ animation: 'none' }}/>
                        </Stack.Group>
                        <Stack.Group screenOptions={{ presentation: 'modal', animation: 'slide_from_bottom' }}>
                            <Stack.Screen name="SelectMethodModal" component={views.SelectionMethodModalView} />
                        </Stack.Group>
                    </Stack.Navigator>
                </NavigationContainer>
            </ThemeProvider>
        </SafeAreaView>
    );
};

export default App;
