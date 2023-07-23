import { RecipeIngredient } from 'backend-logic';
import { observer } from 'mobx-react-lite';
import { IngredientNameInput, IngredientQuantityInput, RecipeIngredientWrapper } from './Ingredients.styles';

interface RecipeIngredientViewProps {
    ingredient: RecipeIngredient;
    isLast: boolean;
    quantity: string;
    addRecipeIngredient: () => any;
    setIngredientName: (name: string) => any;
    setIngredientQuantity: (quantity: string) => any;
}

export const RecipeIngredientView: React.FC<RecipeIngredientViewProps> = observer(({
    ingredient,
    isLast,
    addRecipeIngredient,
    setIngredientName,
    setIngredientQuantity,
    quantity,
}) => (
    <RecipeIngredientWrapper>
        <IngredientNameInput
            placeholder='Ingredient name'
            onEndEditing={isLast ? addRecipeIngredient : undefined}
            value={ingredient.ingredient?.name ?? ''}
            onChange={setIngredientName} />
        <IngredientQuantityInput
            onEndEditing={isLast ? addRecipeIngredient : undefined}
            value={quantity}
            onChange={setIngredientQuantity}
        />
    </RecipeIngredientWrapper>
));
