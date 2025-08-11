import React, { ComponentProps, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { ISubNavigator } from '~/RootNavigation';
import { Tab } from './Tab';
import { TabBar } from './TabBar';

export interface Step<StepName extends string> {
    name: StepName;
    component: Defined<ComponentProps<typeof Tab.Screen>['component']>;
}

export type StepperSubNavigator<StepName extends string> = ISubNavigator<
    Record<StepName, undefined>,
    StepName
>;

const stepperBottomBarHeightContext = React.createContext(0);

export const useStepperBottomBarHeight = () => useContext(stepperBottomBarHeightContext);

export interface StepperProps<StepName extends string> {
    steps: Step<StepName>[];
    onFinish?: () => void;
    lastStepButtonText?: string;
    lastStepButtonLoading?: boolean;
    hideBottomAndTopOnFirstStep?: boolean;
}

export const Stepper = <StepName extends string>({
    steps,
    onFinish,
    lastStepButtonText,
    lastStepButtonLoading,
    hideBottomAndTopOnFirstStep,
}: StepperProps<StepName>) => {
    const [bottomBarWrapper, setBottomBarWrapper] = useState<View | null>(null);
    const [bottomBarHeight, setBottomBarHeight] = useState(0);

    useLayoutEffect(() => {
        bottomBarWrapper?.measureInWindow((_, __, ___, height) => setBottomBarHeight(height));
    }, [bottomBarWrapper]);

    const memoedSteps = useMemo(
        () =>
            steps.map(({ name, component }) => (
                <Tab.Screen
                    key={name}
                    name={name}
                    component={component}
                />
            )),
        [steps],
    );

    return (
        <stepperBottomBarHeightContext.Provider value={bottomBarHeight}>
            <Tab.Navigator
                tabBar={props => (
                    <TabBar
                        {...props}
                        ref={setBottomBarWrapper}
                        lastStepButtonLoading={lastStepButtonLoading}
                        lastStepButtonText={lastStepButtonText}
                        onFinish={onFinish}
                        isHiddenOnFirstStep={!!hideBottomAndTopOnFirstStep}
                    />
                )}
                screenOptions={{ swipeEnabled: false }}
                backBehavior="order"
            >
                {memoedSteps}
            </Tab.Navigator>
        </stepperBottomBarHeightContext.Provider>
    );
};
