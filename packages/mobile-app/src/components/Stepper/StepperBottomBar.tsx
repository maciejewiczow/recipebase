import React from 'react';
import { BottomBarWrapper, Button, IconNext } from './Stepper.styles';
import { NavigationProp } from '@react-navigation/native';
import { StepperNavParams } from './Tab';

interface StepperBottomBarProps {
    navigation: NavigationProp<StepperNavParams>;
    onFinish: (() => void) | undefined;
    lastStepButtonText: string | undefined;
}

export const StepperBottomBar: React.FC<StepperBottomBarProps> = ({
    navigation,
    onFinish,
    lastStepButtonText,
}) => {
    const state = navigation.getState();

    const isLastStep = state.index === state.routeNames.length - 1;

    const nextRouteName = !isLastStep && state.routeNames[state.index + 1];
    const prevRouteName = state.index > 0 && state.routeNames[state.index - 1];

    return (
        <BottomBarWrapper>
            <Button
                variant="secondary"
                disabled={!prevRouteName}
                onPress={() => {
                    if (prevRouteName) navigation.navigate(prevRouteName);
                }}
            >
                Back
            </Button>
            <Button
                variant="primary"
                disabled={isLastStep && !lastStepButtonText}
                onPress={() => {
                    if (!isLastStep && nextRouteName)
                        navigation.navigate(nextRouteName);
                    else onFinish?.();
                }}
            >
                {isLastStep && lastStepButtonText ? (
                    lastStepButtonText
                ) : (
                    <>
                        Next <IconNext />
                    </>
                )}
            </Button>
        </BottomBarWrapper>
    );
};
