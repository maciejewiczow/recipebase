import React from 'react';
import { TagCreator } from '~/components/TagCreator';
import { StepHeader, StepWrapper } from '../common.styles';

export const Tags: React.FC = () => (
    <StepWrapper>
        <StepHeader>Tags</StepHeader>
        <TagCreator />
    </StepWrapper>
);

