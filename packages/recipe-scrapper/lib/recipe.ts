export interface Range {
    from: number;
    to: number;
}

export interface IngredientSection {
    name?: string;
    ingredients: Ingredient[];
}

export interface Ingredient {
    name: string;
    quantity?: string | number | Range;
    unit?: string;
}

export interface RecipeSection {
    name?: string;
    steps: string[];
}

export interface Recipe {
    name: string;
    ingredientSections: IngredientSection[];
    sections: RecipeSection[];
    description?: string;
    coverImageSrc?: string;
}
