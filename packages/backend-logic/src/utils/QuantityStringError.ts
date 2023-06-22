import IngredientSection from '../entities/IngredientSection';
import RecipeIngredient from '../entities/RecipeIngredient';

export class QuantityStringError extends Error {
    sectionId: number;
    ingredientId: number;

    constructor(section: IngredientSection, ingredient: RecipeIngredient) {
        super();
        this.sectionId = section.id;
        this.ingredientId = ingredient.id;
    }
}
