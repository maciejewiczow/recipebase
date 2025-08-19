import React from 'react';
import { TagCreator } from '~/components/TagCreator';
import { ScrollableStepWrapper, StepHeaderText } from '../common.styles';
import { StepHeaderWrapper } from './Tags.styles';

export const Tags: React.FC = () => (
    <ScrollableStepWrapper>
        <StepHeaderWrapper>
            <StepHeaderText>Tags</StepHeaderText>
        </StepHeaderWrapper>
        <TagCreator />
    </ScrollableStepWrapper>
);
