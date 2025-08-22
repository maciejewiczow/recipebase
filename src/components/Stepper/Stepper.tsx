import React, { useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { TabBar } from './TabBar';
import { StepperProps } from './types';
import { iconOffsetPx } from './Stepper.styles';

const stepperBottomBarHeightContext = React.createContext(0);

export const useStepperBottomBarHeight = () => useContext(stepperBottomBarHeightContext);

export const Stepper = <StepName extends string, Params extends object | undefined>({
    navigator,
    steps,
    onFinish,
    lastStepButtonText,
    lastStepButtonLoading,
    hideBottomAndTopOnFirstStep,
}: StepperProps<StepName, Params>) => {
    const bottomBarWrapperRef = useRef<View>(null);
    const [bottomBarHeight, setBottomBarHeight] = useState(0);

    useLayoutEffect(() => {
        bottomBarWrapperRef.current?.measureInWindow((_, __, ___, height) =>
            setBottomBarHeight(height + iconOffsetPx),
        );
    }, []);

    const memoedSteps = useMemo(
        () =>
            // @ts-expect-error ugabuga
            steps.map(({ name, component, params }) => (
                <navigator.Screen
                    key={name}
                    name={name}
                    // @ts-expect-error ugabuga 2
                    component={component}
                    initialParams={params}
                />
            )),
        [steps, navigator],
    );

    return (
        <stepperBottomBarHeightContext.Provider value={bottomBarHeight}>
            <navigator.Navigator
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
            </navigator.Navigator>
        </stepperBottomBarHeightContext.Provider>
    );
};
