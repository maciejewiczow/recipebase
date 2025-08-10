import React from 'react';
import { TagCreator } from '~/components/TagCreator';
import { useIsKeyboardOpen } from '~/utils/useIsKeyoardOpen';
import { ScrollableStepWrapper, StepHeaderText } from '../common.styles';
import { StepHeaderWrapper } from './Tags.styles';

export const Tags: React.FC = () => {
    const isKeyboardOpen = useIsKeyboardOpen();

    return (
        <ScrollableStepWrapper isKeyboardOpen={isKeyboardOpen}>
            <StepHeaderWrapper>
                <StepHeaderText>Tags</StepHeaderText>
            </StepHeaderWrapper>
            <TagCreator />
        </ScrollableStepWrapper>
    );
};
