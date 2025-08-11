import { RenderItem, ScaleDecorator, ShadowDecorator } from 'react-native-draggable-flatlist';
import { useNavigation } from '@react-navigation/native';
import { IngredientSection, RecipeIngredient } from 'backend-logic';
import { observer } from 'mobx-react-lite';
import { RecipeIngredientListItem } from '~/components/RecipeIngredientListItem';
import { RootNavigationProp } from '~/RootNavigation';
import { useRootStore } from '~/RootStoreContext';
import { ListItemMenu } from '../ListItemMenu';
import { ItemType } from './Ingredients';
import { IngredientSectionHeader } from './IngredientSectionHeader';
import {
    DraggableListItemWrapper,
    DragHandleIcon,
    DragHandleWrapper,
    SectionSeparator,
} from '../common.styles';
import { AddIngredientButton } from './RecipeIngredientView.styles';

const IngredientView: React.FC<{
    ingredient: RecipeIngredient;
    drag: () => void;
}> = observer(({ ingredient, drag }) => {
    const { draftRecipe } = useRootStore();
    const navigation = useNavigation<RootNavigationProp>();

    const removeIngredient = () => {
        if (ingredient.ingredientSection) {
            draftRecipe.removeRecipeIngredient(ingredient.ingredientSection.id, ingredient.id);
        }
    };

    const editIngredient = () => {
        if (ingredient.ingredientSection) {
            navigation.navigate('AddIngredientView', {
                targetSectionId: ingredient.ingredientSection.id,
                recipeIngredientToEditId: ingredient.id,
            });
        }
    };

    return (
        <RecipeIngredientListItem
            leftSection={
                <DragHandleWrapper onPressIn={drag}>
                    <DragHandleIcon />
                </DragHandleWrapper>
            }
            rightSection={
                <ListItemMenu
                    onEditPress={editIngredient}
                    onRemovePress={removeIngredient}
                />
            }
            recipeIngredient={ingredient}
        />
    );
});

const SectionSeparatorView: React.FC<{ section: IngredientSection }> = observer(({ section }) => {
    const { draftRecipe } = useRootStore();

    const prevSectionIndex =
        (draftRecipe.recipe.ingredientSections?.findIndex(s => s.id === section.id) ?? 0) - 1;

    return (
        <>
            {prevSectionIndex >= 0 && draftRecipe.recipe.ingredientSections && (
                <>
                    <AddIngredientButton
                        targetSectionId={draftRecipe.recipe.ingredientSections[prevSectionIndex].id}
                    />
                    <SectionSeparator />
                </>
            )}
            <IngredientSectionHeader section={section} />
        </>
    );
});

export const renderItem: RenderItem<ItemType> = ({ drag, item }) => (
    <ShadowDecorator>
        <ScaleDecorator activeScale={1.05}>
            <DraggableListItemWrapper>
                {item instanceof RecipeIngredient ? (
                    <IngredientView
                        ingredient={item}
                        drag={drag}
                    />
                ) : (
                    <SectionSeparatorView section={item} />
                )}
            </DraggableListItemWrapper>
        </ScaleDecorator>
    </ShadowDecorator>
);
