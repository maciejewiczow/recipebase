import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import { MenuProvider } from 'react-native-popup-menu';
import { rootNavigationRef, Stack } from './src/RootNavigation';
import { darkTheme, lightTheme } from './src/theme';
import { rootStore, RootStoreContext } from './src/RootStoreContext';
import * as views from './src/views';

import 'reflect-metadata';

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                <MenuProvider>
                    <RootStoreContext.Provider value={rootStore}>
                        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                            <NavigationContainer ref={rootNavigationRef}>
                                <Stack.Navigator
                                    initialRouteName="Splash"
                                    screenOptions={{
                                        headerShown: false,
                                        animation: 'slide_from_right',
                                    }}
                                >
                                    <Stack.Group>
                                        <Stack.Screen name="Splash" component={views.SplashView} />
                                        <Stack.Screen name="HomeTabNavigator" component={views.HomeNavigationView} />
                                        <Stack.Screen name="SelectDatabase" component={views.SelectDatabaseView} options={{ animation: 'none' }} />
                                        <Stack.Screen name="GDriveFilePicker" component={views.GDriveFilePickerView} />
                                        <Stack.Screen name="Recipe" component={views.RecipeView} />
                                    </Stack.Group>
                                    <Stack.Group screenOptions={{ presentation: 'modal', animation: 'slide_from_bottom' }}>
                                        <Stack.Screen name="SelectMethodModal" component={views.SelectionMethodModalView} />
                                        <Stack.Screen
                                            name="CreateRecipe"
                                            component={views.CreateRecipeView}
                                            options={{
                                                title: 'Create recipe',
                                                headerShown: true,
                                                headerShadowVisible: false,
                                            }}
                                        />
                                    </Stack.Group>
                                </Stack.Navigator>
                            </NavigationContainer>
                        </ThemeProvider>
                    </RootStoreContext.Provider>
                </MenuProvider>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default App;
