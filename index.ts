import { LogBox } from 'react-native';
import { registerRootComponent } from 'expo';
import { App } from './App';

LogBox.ignoreLogs([
    'Require cycle',
    'Warning: ref.measureLayout must be called with a ref to a native component.',
]);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
