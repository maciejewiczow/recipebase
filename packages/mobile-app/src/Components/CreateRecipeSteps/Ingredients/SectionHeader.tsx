import React from 'react';
import { useRootStore } from '~/RootStoreContext';
import { DeleteSectionIcon, DeleteSectionIconWrapper, SectionNameInput, SectionNameInputRow } from '../common.styles';
import { StyleProp, ViewStyle } from 'react-native';
import { IngredientSection } from 'backend-logic';
import { observer } from 'mobx-react-lite';

interface SectionHeaderProps {
    section?: IngredientSection;
    style?: StyleProp<ViewStyle>;
}

export const SectionHeader: React.FC<SectionHeaderProps> = observer(({ section, style }) => {
    const { draftRecipe } = useRootStore();

    const removeIngredientSection = (sectionId?: number) => () => {
        if (sectionId)
            draftRecipe.removeIngredientSection(sectionId);
    };

    const setIngredientSectionName = (sectionId?: number) => (name: string) => {
        if (sectionId)
            draftRecipe.setIngredientSectionName(sectionId, name);
    };

    return (
        <SectionNameInputRow style={style}>
            <SectionNameInput
                label="Section name"
                value={section?.name ?? ''}
                onChange={setIngredientSectionName(section?.id)}
            />
            <DeleteSectionIconWrapper onPress={removeIngredientSection(section?.id)}>
                <DeleteSectionIcon />
            </DeleteSectionIconWrapper>
        </SectionNameInputRow>
    );
});
