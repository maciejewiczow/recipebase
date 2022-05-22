export interface Range {
    from: number;
    to: number;
}

export interface Ingredient {
    name: string;
    quantity?: string | number | Range;
    unit?: string;
}

export interface Recipe {
    name: string;
    ingredients: Ingredient[];
    steps: string[];
    description?: string;
    coverImageSrc?: string;
}
