import { ComponentProps, useMemo, useRef } from 'react';
import { ISubNavigator } from '~/RootNavigation';
import { TabBarHiddenContext } from './context';
import { extractNavigation } from './extractNavigation';
import { StepperBottomBar } from './StepperBottomBar';
import { StepperNavigation, Tab } from './Tab';
import { TabBar } from './TabBar';

export interface Step<StepName extends string> {
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
    hideBottomAndTopOnFirstStep?: boolean;
}

export const Stepper = <StepName extends string>({
    steps,
    onFinish,
    lastStepButtonText,
    lastStepButtonLoading,
    hideBottomAndTopOnFirstStep,
}: StepperProps<StepName>) => {
    const navigation = useRef<StepperNavigation>();

    const memoedSteps = useMemo(
        () => steps.map(({ name, component }) => (
                <Tab.Screen
                    key={name}
                    name={name}
                    component={extractNavigation(navigation, component)}
                />
            )),
        [steps],
    );

    return (
        <TabBarHiddenContext.Provider value={!!hideBottomAndTopOnFirstStep}>
            <Tab.Navigator
                tabBar={TabBar}
                screenOptions={{ swipeEnabled: false }}
                backBehavior="order"
            >
                {memoedSteps}
            </Tab.Navigator>
            <StepperBottomBar
                onFinish={onFinish}
                navigationRef={navigation}
                lastStepButtonText={lastStepButtonText}
                lastStepButtonLoading={lastStepButtonLoading}
                hideBottomAndTopOnFirstStep={hideBottomAndTopOnFirstStep}
            />
        </TabBarHiddenContext.Provider>
    );
};
