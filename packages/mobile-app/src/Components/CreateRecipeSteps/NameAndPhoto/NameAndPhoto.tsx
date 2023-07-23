import React from 'react';
import { ImageInput } from './NameAndPhoto.styles';
import { useRootStore } from '~/RootStoreContext';
import { Input, SectionHeader, StepWrapper } from '../common.styles';
import { observer } from 'mobx-react-lite';

export const NameAndPhoto: React.FC = observer(() => {
    const { recipes } = useRootStore();

    return (
        <StepWrapper>
            <SectionHeader>Name and photo</SectionHeader>
            <Input label="Name" value={recipes.draftRecipe.name} onChange={recipes.setDraftRecipeName} />
            <ImageInput
                label="Cover image"
                value={recipes.draftRecipe.coverImage}
                onChange={recipes.setDraftRecipeCoverImage}
            />
        </StepWrapper>
    );
});

