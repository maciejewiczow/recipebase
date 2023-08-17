import { IngredientSection, RecipeIngredient } from 'backend-logic';
import { IngredientNameWrapper, QuantityWrapper, RecipeIngredientWrapper, Text } from './Ingredients.styles';
import { ItemType } from './Ingredients';
import { RenderItem, ScaleDecorator, ShadowDecorator } from 'react-native-draggable-flatlist';
import { AddIngredientButton } from './AddIngredientButton';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '~/RootStoreContext';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '~/RootNavigation';
import { IngredientSectionHeader } from './IngredientSectionHeader';
import { DragHandleIcon, DragHandleWrapper, DraggableListItemWrapper } from '../common.styles';
import { ListItemMenu } from '../ListItemMenu';

const IngredientView: React.FC<{ ingredient: RecipeIngredient; drag: () => void }> = observer(({
    ingredient: { id, ingredient, unit, quantityFrom, quantityTo, ingredientSection },
    drag,
}) => {
    const { draftRecipe } = useRootStore();
    const navigation = useNavigation<RootNavigationProp>();

    const removeIngredient = () => {
        if (ingredientSection)
            draftRecipe.removeRecipeIngredient(ingredientSection.id, id);
    };

    const editIngredient = () => {
        if (ingredientSection) {
            navigation.navigate(
                'AddIngredientView',
                {
                    targetSectionId: ingredientSection.id,
                    recipeIngredientToEditId: id,
                }
            );
        }
    };

    return (
        <RecipeIngredientWrapper>
            <DragHandleWrapper onPressIn={drag}>
                <DragHandleIcon />
            </DragHandleWrapper>
            <QuantityWrapper>
                <Text>
                    {quantityFrom}{quantityTo ? '-' : ''}{quantityTo} {unit?.name}
                </Text>
            </QuantityWrapper>
            <IngredientNameWrapper>
                <Text>{ingredient?.name}</Text>
            </IngredientNameWrapper>
            <ListItemMenu
                onEditPress={editIngredient}
                onRemovePress={removeIngredient}
            />
        </RecipeIngredientWrapper>
    );
});

const SectionSeparatorView: React.FC<{ section: IngredientSection }> = observer(({ section }) => {
    const { draftRecipe } = useRootStore();

    const prevSectionIndex = (draftRecipe.recipe.ingredientSections?.findIndex(s => s.id === section.id) ?? 0) - 1;

    return (
        <>
            {prevSectionIndex >= 0 && draftRecipe.recipe.ingredientSections && (
                <AddIngredientButton targetSectionId={draftRecipe.recipe.ingredientSections[prevSectionIndex].id} />
            )}
            <IngredientSectionHeader section={section} />
        </>
    );
});

export const renderItem: RenderItem<ItemType> = ({
    drag,
    item,
}) => (
    <ShadowDecorator>
        <ScaleDecorator>
            <DraggableListItemWrapper>
                {item instanceof RecipeIngredient ? (
                    <IngredientView
                        ingredient={item}
                        drag={drag}
                    />
                ) : (
                    <SectionSeparatorView
                        section={item}
                    />
                )}
            </DraggableListItemWrapper>
        </ScaleDecorator>
    </ShadowDecorator>
);
