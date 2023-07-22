import React, { ComponentProps, useState } from 'react';
import { StepperNavigation, Tab } from './Tab';
import { TabBar } from './TabBar';
import { extractNavigation } from './extractNavigation';
import { StepperBottomBar } from './StepperBottomBar';

interface Step {
    name: string;
    component: Defined<ComponentProps<typeof Tab.Screen>['component']>;
}

export interface StepperProps {
    steps: Step[];
    onFinish?: () => void;
    lastStepButtonText?: string;
}

export const Stepper: React.FC<StepperProps> = ({ steps, onFinish, lastStepButtonText }) => {
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
                />
            )}
        </>
    );
};

