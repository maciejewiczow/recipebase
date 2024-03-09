import { RecipeSection, RecipeStep } from 'backend-logic';
import { observer } from 'mobx-react-lite';
import { RecipeStepWrapper, StepPreviewText } from './Steps.styles';
import { RenderItem, ScaleDecorator, ShadowDecorator } from 'react-native-draggable-flatlist';
import { ItemType } from './Steps';
import { DragHandleIcon, DragHandleWrapper, DraggableListItemWrapper } from '../common.styles';
import React from 'react';
import { useRootStore } from '~/RootStoreContext';
import { AddStepButton } from './AddStepButton';
import { RecipeSectionHeader } from './RecipeSectionHeader';
import { ListItemMenu } from '../ListItemMenu';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '~/RootNavigation';

interface RecipeStepPreviewProps {
    step: RecipeStep;
    drag: () => void;
}

const RecipeStepPreview: React.FC<RecipeStepPreviewProps> = observer(({ step, drag }) => {
    const { draftRecipe } = useRootStore();
    const navigation = useNavigation<RootNavigationProp>();

    const removeStep = () => {
        if (step.recipeSection?.id) draftRecipe.removeRecipeStep(step.recipeSection.id, step.id);
    };

    const editStep = () => {
        if (step.recipeSection?.id) {
            navigation.navigate('AddStepView', {
                targetSectionId: step.recipeSection.id,
                stepToEditId: step.id,
            });
        }
    };

    return (
        <RecipeStepWrapper>
            <DragHandleWrapper onPressIn={drag}>
                <DragHandleIcon />
            </DragHandleWrapper>
            <StepPreviewText>{step.content}</StepPreviewText>
            <ListItemMenu
                onEditPress={editStep}
                onRemovePress={removeStep}
            />
        </RecipeStepWrapper>
    );
});

interface SectionSeparatorViewProps {
    section: RecipeSection;
}

const SectionSeparatorView: React.FC<SectionSeparatorViewProps> = observer(({ section }) => {
    const { draftRecipe } = useRootStore();

    const prevSectionIndex = (draftRecipe.recipe.sections?.findIndex(s => s.id === section.id) ?? 0) - 1;

    return (
        <>
            {prevSectionIndex >= 0 && draftRecipe.recipe.sections && (
                <AddStepButton targetSectionId={draftRecipe.recipe.sections[prevSectionIndex].id} />
            )}
            <RecipeSectionHeader section={section} />
        </>
    );
});

export const renderItem: RenderItem<ItemType> = ({ drag, item }) => (
    <ScaleDecorator>
        <ShadowDecorator>
            <DraggableListItemWrapper>
                {item instanceof RecipeStep ? (
                    <RecipeStepPreview
                        step={item}
                        drag={drag}
                    />
                ) : (
                    <SectionSeparatorView section={item} />
                )}
            </DraggableListItemWrapper>
        </ShadowDecorator>
    </ScaleDecorator>
);
