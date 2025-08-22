import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { ISubNavigator } from '~/RootNavigation';

export type MaterialTopTabsNavigator<StepName extends string, Params extends object | undefined> = ReturnType<
    typeof createMaterialTopTabNavigator<Record<StepName, Params>>
>;

export interface StepperProps<StepName extends string, Params extends object | undefined> {
    navigator: MaterialTopTabsNavigator<StepName, Params>;
    steps: Step<StepName, Params>[];
    onFinish?: () => void;
    lastStepButtonText?: string;
    lastStepButtonLoading?: boolean;
    hideBottomAndTopOnFirstStep?: boolean;
}

export type StepperStepViewComponent<StepName extends string, Params extends object | undefined> = React.FC<{
    route: RouteProp<Record<StepName, Params>>;
    navgation: NavigationProp<Record<StepName, Params>>;
}>;

export type Step<StepName extends string, Params extends object | undefined> = {
    name: StepName;
    component: StepperStepViewComponent<StepName, Params>;
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
} & (undefined extends Params ? {} : { params: Params });

export type StepperSubNavigator<StepName extends string, Params extends object | undefined> = ISubNavigator<
    Record<StepName, Params>,
    StepName
>;

export type StepperNavParams<Params extends object | undefined> = Record<string, Params>;

export type StepperNavigation<Params extends object | undefined> = NavigationProp<StepperNavParams<Params>>;
