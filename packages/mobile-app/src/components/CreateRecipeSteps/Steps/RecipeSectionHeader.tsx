import React from 'react';
import { SectionHeader } from '../SectionHeader';
import { useRootStore } from '~/RootStoreContext';
import { observer } from 'mobx-react-lite';
import { RecipeSection } from 'backend-logic';
import { StyleProp, ViewStyle } from 'react-native';

interface RecipeSectionHeaderProps {
    section?: RecipeSection;
    style?: StyleProp<ViewStyle>;
}

export const RecipeSectionHeader: React.FC<RecipeSectionHeaderProps> = observer(({ section, style }) => {
    const { draftRecipe } = useRootStore();

    const removeIngredientSection = (sectionId?: number) => () => {
        if (sectionId) draftRecipe.removeSection(sectionId);
    };

    const setIngredientSectionName = (sectionId?: number) => (name: string) => {
        if (sectionId) draftRecipe.setSectionName(sectionId, name);
    };

    return (
        <SectionHeader
            style={style}
            sectionName={section?.name ?? ''}
            onSectionNameChange={setIngredientSectionName(section?.id)}
            onSectionDeletePress={removeIngredientSection(section?.id)}
        />
    );
});
