import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '~/RootStoreContext';
import { Input, StepHeader, StepWrapper } from '../common.styles';

export const Details: React.FC = observer(() => {
    const { draftRecipe } = useRootStore();

    return (
        <StepWrapper>
            <StepHeader>Details</StepHeader>
            <Input
                label="Description"
                numberOfLines={4}
                value={draftRecipe.recipe.description}
                onChange={draftRecipe.setDescription}
                multiline
            />
            <Input
                label="Source"
                value={draftRecipe.recipe.source}
                onChange={draftRecipe.setSource}
            />
        </StepWrapper>
    );
});
