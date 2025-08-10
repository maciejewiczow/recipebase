import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { useIsKeyboardOpen } from '~/utils/useIsKeyoardOpen';
import { StepperNextSvg } from '../Svg/StepperNextSvg';
import { StepperPrevSvg } from '../Svg/StepperPrevSvg';
import { StepperNavParams } from './Tab';
import {
    BottomBarBackground,
    ButtonIconWrapper,
    ButtonText,
    CurrentStepNumber,
    StepNumberWrapper,
    TotalStepCount,
} from './Stepper.styles';

interface StepperBottomBarProps {
    navigationRef: React.MutableRefObject<NavigationProp<StepperNavParams> | undefined>;
    onFinish: (() => void) | undefined;
    lastStepButtonText: string | undefined;
    lastStepButtonLoading: boolean | undefined;
    hideBottomAndTopOnFirstStep: boolean | undefined;
}

export const StepperBottomBar: React.FC<StepperBottomBarProps> = ({
    navigationRef,
    onFinish,
    lastStepButtonText,
    lastStepButtonLoading,
    hideBottomAndTopOnFirstStep,
}) => {
    const isKeyboardOpen = useIsKeyboardOpen();

    if (!navigationRef.current || isKeyboardOpen) {
        return null;
    }

    const state = navigationRef.current.getState();

    const isFirstStep = state.index === 0;
    const isLastStep = state.index === state.routeNames.length - 1;

    const nextRouteName = !isLastStep && state.routeNames[state.index + 1];
    const prevRouteName = state.index > 0 && state.routeNames[state.index - 1];

    if (isFirstStep && hideBottomAndTopOnFirstStep) {
        return null;
    }

    return (
        <BottomBarBackground>
            <ButtonIconWrapper
                disabled={!prevRouteName}
                onPress={() => {
                    if (prevRouteName) {
                        navigationRef.current?.navigate(prevRouteName);
                    }
                }}
            >
                <StepperPrevSvg />
                <ButtonText>Back</ButtonText>
            </ButtonIconWrapper>
            <StepNumberWrapper>
                <CurrentStepNumber>
                    {hideBottomAndTopOnFirstStep ? state.index : state.index + 1}
                </CurrentStepNumber>
                <TotalStepCount isCompleted={isLastStep}>
                    /{hideBottomAndTopOnFirstStep ? state.routeNames.length - 1 : state.routeNames.length}
                </TotalStepCount>
            </StepNumberWrapper>
            <ButtonIconWrapper
                disabled={isLastStep && !lastStepButtonText}
                onPress={() => {
                    if (!isLastStep && nextRouteName) {
                        navigationRef.current?.navigate(nextRouteName);
                    } else if (isLastStep) {
                        onFinish?.();
                    }
                }}
            >
                <StepperNextSvg />
                <ButtonText>{(isLastStep && lastStepButtonText) || 'Next'}</ButtonText>
            </ButtonIconWrapper>
        </BottomBarBackground>
    );
};
