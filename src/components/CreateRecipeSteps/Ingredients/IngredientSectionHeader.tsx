import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { IngredientSection } from 'backend-logic';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '~/RootStoreContext';
import { SectionHeader } from '../SectionHeader';

interface IngredientSectionHeaderProps {
    section?: IngredientSection;
    style?: StyleProp<ViewStyle>;
}

export const IngredientSectionHeader: React.FC<IngredientSectionHeaderProps> = observer(
    ({ section, style }) => {
        const { draftRecipe } = useRootStore();

        const removeIngredientSection = (sectionId?: number) => () => {
            if (sectionId) {
                draftRecipe.removeIngredientSection(sectionId);
            }
        };

        const setIngredientSectionName = (sectionId?: number) => (name: string) => {
            if (sectionId) {
                draftRecipe.setIngredientSectionName(sectionId, name);
            }
        };

        return (
            <SectionHeader
                style={style}
                sectionName={section?.name ?? ''}
                onSectionNameChange={setIngredientSectionName(section?.id)}
                onSectionDeletePress={removeIngredientSection(section?.id)}
            />
        );
    },
);
