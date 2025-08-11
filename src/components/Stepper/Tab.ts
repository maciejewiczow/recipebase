import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationProp } from '@react-navigation/native';

export type StepperNavParams = Record<string, undefined>;

export type StepperNavigation = NavigationProp<StepperNavParams>;

export const Tab = createMaterialTopTabNavigator<StepperNavParams>();
