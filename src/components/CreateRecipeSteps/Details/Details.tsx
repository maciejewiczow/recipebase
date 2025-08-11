import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '~/RootStoreContext';
import { Input, StepHeaderText, StepHeaderWrapper, StepWrapper } from '../common.styles';

export const Details: React.FC = observer(() => {
    const { draftRecipe } = useRootStore();

    return (
        <StepWrapper>
            <StepHeaderWrapper>
                <StepHeaderText>Details</StepHeaderText>
            </StepHeaderWrapper>
            <Input
                label="Description"
                placeholder="Describe your dish here"
                numberOfLines={4}
                value={draftRecipe.recipe.description}
                onChange={draftRecipe.setDescription}
                multiline
            />
            <Input
                label="Source"
                placeholder="Add source of the recipe"
                value={draftRecipe.recipe.source}
                onChange={draftRecipe.setSource}
            />
        </StepWrapper>
    );
});
