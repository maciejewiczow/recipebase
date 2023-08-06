import { IngredientSection, RecipeIngredient } from 'backend-logic';
import {
    DragHandleIcon,
    DragHandleWrapper,
    EditIcon,
    EditIconWrapper,
    IngredientNameWrapper,
    ListItemWrapper,
    QuantityWrapper,
    RecipeIngredientWrapper,
    Text,
} from './Ingredients.styles';
import { ItemType } from './Ingredients';
import { RenderItem, ScaleDecorator, ShadowDecorator } from 'react-native-draggable-flatlist';
import { AddIngredientButton } from './AddIngredientButton';
import { SectionHeader } from './SectionHeader';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '~/RootStoreContext';

const IngredientView: React.FC<{ ingredient: RecipeIngredient; drag: () => void }> = ({
    ingredient: { ingredient, unit, quantityFrom, quantityTo },
    drag,
}) => (
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
        <EditIconWrapper>
            <EditIcon />
        </EditIconWrapper>
    </RecipeIngredientWrapper>
);

const SectionSeparatorView: React.FC<{ section: IngredientSection }> = observer(({ section }) => {
    const { draftRecipe } = useRootStore();

    const prevSectionIndex = (draftRecipe.recipe.ingredientSections?.findIndex(s => s.id === section.id) ?? 0) - 1;

    return (
        <>
            {prevSectionIndex >= 0 && draftRecipe.recipe.ingredientSections && (
                <AddIngredientButton targetSectionId={draftRecipe.recipe.ingredientSections[prevSectionIndex].id} />
            )}
            <SectionHeader section={section} />
        </>
    );
});

export const renderItem: RenderItem<ItemType> = ({
    drag,
    item,
}) => (
    <ShadowDecorator>
        <ScaleDecorator>
            <ListItemWrapper>
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
            </ListItemWrapper>
        </ScaleDecorator>
    </ShadowDecorator>
);
