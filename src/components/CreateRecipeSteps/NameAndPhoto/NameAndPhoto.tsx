import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '~/RootStoreContext';
import { Input, ScrollableStepWrapper, StepHeaderText, StepHeaderWrapper } from '../common.styles';
import { ImageInput } from './NameAndPhoto.styles';

export const NameAndPhoto: React.FC = observer(() => {
    const { draftRecipe } = useRootStore();

    return (
        <ScrollableStepWrapper>
            <StepHeaderWrapper>
                <StepHeaderText>Dish name & photo</StepHeaderText>
            </StepHeaderWrapper>
            <Input
                label="Name"
                placeholder="Add a name here"
                value={draftRecipe.recipe.name}
                onChange={draftRecipe.setName}
            />
            <ImageInput
                label="Cover image"
                value={draftRecipe.recipe.coverImage}
                onChange={draftRecipe.setCoverImage}
            />
        </ScrollableStepWrapper>
    );
});
