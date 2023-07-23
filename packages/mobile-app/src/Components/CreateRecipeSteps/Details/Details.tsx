import React from 'react';
import { useRootStore } from '~/RootStoreContext';
import { Input, SectionHeader, StepWrapper } from '../common.styles';
import { observer } from 'mobx-react-lite';

export const Details: React.FC = observer(() => {
    const { recipes } = useRootStore();

    return (
        <StepWrapper>
            <SectionHeader>Details</SectionHeader>
            <Input
                label="Description"
                numberOfLines={4}
                value={recipes.draftRecipe.description}
                onChange={recipes.setDraftRecipeDescription}
                multiline
            />
            <Input
                label="Source"
                value={recipes.draftRecipe.sourceUrl}
                onChange={recipes.setDraftRecipeSource}
            />
        </StepWrapper>
    );
});

