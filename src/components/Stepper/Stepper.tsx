import React, { ComponentProps, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { ISubNavigator } from '~/RootNavigation';
import { Tab } from './Tab';
import { TabBar } from './TabBar';
import { iconOffsetPx } from './Stepper.styles';

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
    const bottomBarWrapperRef = useRef<View>(null);
    const [bottomBarHeight, setBottomBarHeight] = useState(0);

    useLayoutEffect(() => {
        bottomBarWrapperRef.current?.measureInWindow((_, __, ___, height) =>
            setBottomBarHeight(height + iconOffsetPx),
        );
    }, []);

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
                        onBottomBarLayout={e =>
                            setBottomBarHeight(e.nativeEvent.layout.height + iconOffsetPx)
                        }
                        ref={bottomBarWrapperRef}
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
