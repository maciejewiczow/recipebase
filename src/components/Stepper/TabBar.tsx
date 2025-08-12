import React from 'react';
import { View, ViewProps } from 'react-native';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { StepperBottomBar, StepperBottomBarProps } from './StepperBottomBar';
import { BottomBarWrapper, TabBarProgressStep, TabBarWrapper } from './Stepper.styles';

export const TabBar: React.FC<
    MaterialTopTabBarProps &
        Pick<StepperBottomBarProps, 'onFinish' | 'lastStepButtonText' | 'lastStepButtonLoading'> & {
            isHiddenOnFirstStep: boolean;
            ref?: React.Ref<View>;
            onBottomBarLayout?: ViewProps['onLayout'];
        }
> = ({
    ref,
    state,
    descriptors,
    onFinish,
    lastStepButtonLoading,
    lastStepButtonText,
    navigation,
    isHiddenOnFirstStep,
    onBottomBarLayout,
}) => {
    const isFirstStep = state.index === 0;

    return (
        <>
            <TabBarWrapper>
                {!(isHiddenOnFirstStep && isFirstStep) &&
                    (isHiddenOnFirstStep ? state.routes.slice(1) : state.routes).map((route, index) => {
                        const { options } = descriptors[route.key];

                        const isCompleted = isHiddenOnFirstStep
                            ? state.index >= index + 1
                            : state.index >= index;

                        return (
                            <TabBarProgressStep
                                key={route.key}
                                isCompleted={isCompleted}
                                completedTintColor={options.tabBarActiveTintColor}
                                accessibilityState={{ selected: isCompleted }}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                            />
                        );
                    })}
            </TabBarWrapper>
            <BottomBarWrapper
                ref={ref}
                onLayout={onBottomBarLayout}
            >
                <StepperBottomBar
                    navigation={navigation}
                    state={state}
                    onFinish={onFinish}
                    lastStepButtonText={lastStepButtonText}
                    lastStepButtonLoading={lastStepButtonLoading}
                    hideBottomAndTopOnFirstStep={isHiddenOnFirstStep}
                />
            </BottomBarWrapper>
        </>
    );
};
