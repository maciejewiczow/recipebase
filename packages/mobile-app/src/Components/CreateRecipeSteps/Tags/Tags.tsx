import React from 'react';
import { TagCreator } from '~/components/TagCreator';
import { SectionHeader, StepWrapper } from '../common.styles';

export const Tags: React.FC = () => (
    <StepWrapper>
        <SectionHeader>Tags</SectionHeader>
        <TagCreator />
    </StepWrapper>
);

