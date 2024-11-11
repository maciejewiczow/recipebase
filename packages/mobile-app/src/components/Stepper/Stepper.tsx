import React, { ComponentProps, useState } from 'react';
import { ISubNavigator } from '~/RootNavigation';
import { extractNavigation } from './extractNavigation';
import { StepperBottomBar } from './StepperBottomBar';
import { StepperNavigation, Tab } from './Tab';
import { TabBar } from './TabBar';

interface Step<StepName extends string> {
    name: StepName;
    component: Defined<ComponentProps<typeof Tab.Screen>['component']>;
}

export type StepperSubNavigator<StepName extends string> = ISubNavigator<
    Record<StepName, undefined>,
    StepName
>;

export interface StepperProps<StepName extends string> {
    steps: Step<StepName>[];
    onFinish?: () => void;
    lastStepButtonText?: string;
    lastStepButtonLoading?: boolean;
    hideBackButtonOnFirstStep?: boolean;
}

export const Stepper = <StepName extends string>({
    steps,
    onFinish,
    lastStepButtonText,
    lastStepButtonLoading,
}: StepperProps<StepName>) => {
    const [navigation, setNavigation] = useState<StepperNavigation>();

    return (
        <>
            <Tab.Navigator
                tabBar={TabBar}
                screenOptions={{ swipeEnabled: false }}
                backBehavior="order"
            >
                {steps.map(({ name, component }) => (
                    <Tab.Screen
                        key={name}
                        name={name}
                        component={extractNavigation(setNavigation, component)}
                    />
                ))}
            </Tab.Navigator>
            {navigation && (
                <StepperBottomBar
                    onFinish={onFinish}
                    navigation={navigation}
                    lastStepButtonText={lastStepButtonText}
                    lastStepButtonLoading={lastStepButtonLoading}
                />
            )}
        </>
    );
};
