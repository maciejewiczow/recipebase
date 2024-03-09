import React from 'react';
import { ImageInput } from './NameAndPhoto.styles';
import { useRootStore } from '~/RootStoreContext';
import { Input, StepHeader, StepWrapper } from '../common.styles';
import { observer } from 'mobx-react-lite';

export const NameAndPhoto: React.FC = observer(() => {
    const { draftRecipe } = useRootStore();

    return (
        <StepWrapper>
            <StepHeader>Name and photo</StepHeader>
            <Input
                label="Name"
                value={draftRecipe.recipe.name}
                onChange={draftRecipe.setName}
            />
            <ImageInput
                label="Cover image"
                value={draftRecipe.recipe.coverImage}
                onChange={draftRecipe.setCoverImage}
            />
        </StepWrapper>
    );
});
