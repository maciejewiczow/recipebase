import React, { ComponentProps, useState } from 'react';
import { extractNavigation } from './extractNavigation';
import { StepperBottomBar } from './StepperBottomBar';
import { StepperNavigation, Tab } from './Tab';
import { TabBar } from './TabBar';

interface Step {
    name: string;
    component: Defined<ComponentProps<typeof Tab.Screen>['component']>;
}

export interface StepperProps {
    steps: Step[];
    onFinish?: () => void;
    lastStepButtonText?: string;
    lastStepButtonLoading?: boolean;
    hideBackButtonOnFirstStep?: boolean;
}

export const Stepper: React.FC<StepperProps> = ({
    steps,
    onFinish,
    lastStepButtonText,
    lastStepButtonLoading,
}) => {
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
