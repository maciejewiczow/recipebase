import { IngredientSection, RecipeIngredient } from 'backend-logic';
import {
    DragHandleIcon,
    DragHandleWrapper,
    EditIcon,
    EditIconWrapper,
    IngredientNameWrapper,
    ListItemWrapper,
    MenuItemText,
    MenuItemWrapper,
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
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

const IngredientView: React.FC<{ ingredient: RecipeIngredient; drag: () => void }> = ({
    ingredient: { id, ingredient, unit, quantityFrom, quantityTo, ingredientSection },
    drag,
}) => {
    const { draftRecipe } = useRootStore();

    const removeIngredient = () => {
        if (ingredientSection)
            draftRecipe.removeRecipeIngredient(ingredientSection.id, id);
        else
            console.warn('Missing section');
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
            <EditIconWrapper>
                <Menu>
                    <MenuTrigger>
                        <EditIcon />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption>
                            <MenuItemWrapper>
                                <MenuItemText>Edit</MenuItemText>
                            </MenuItemWrapper>
                        </MenuOption>
                        <MenuOption onSelect={removeIngredient}>
                            <MenuItemWrapper>
                                <MenuItemText>Remove</MenuItemText>
                            </MenuItemWrapper>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </EditIconWrapper>
        </RecipeIngredientWrapper>
    );
};

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
