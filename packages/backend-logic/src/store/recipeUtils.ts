import Recipe from '../entities/Recipe';
import Unit from '../entities/Unit';
import { forEachDeep } from '../utils/forEachDeep';
import { QuantityStringError } from '../utils/QuantityStringError';

const unitParsingRegex = /([\d-.,/ ]+) ?(.*)/;
const qtyParsingRegex = /(\d+(?:.\d+)?)\s*-\s*(\d+(?:.\d+)?)/;

export const parseQuantityStringsToIngredientQuantities = (recipe: Recipe, draftRecipeQuantityStrings: Record<number, Record<number, string>>) => {
    for (const section of recipe.ingredientSections ?? []) {
        for (const recipeIngredient of section.recipeIngredients ?? []) {
            const quantityWithUnit = draftRecipeQuantityStrings[section.id][recipeIngredient.id];

            const matches = quantityWithUnit.match(unitParsingRegex);

            if (matches?.length !== 3)
                throw new QuantityStringError(section, recipeIngredient);

            const [_, quantity, unit] = matches;

            if (!recipeIngredient.unit) {
                recipeIngredient.unit = new Unit();
                recipeIngredient.unit.id = Math.random();
            }

            recipeIngredient.unit.name = unit.trim();

            if (qtyParsingRegex.test(quantity)) {
                const qtyMatches = quantity.match(qtyParsingRegex);

                if (!qtyMatches)
                    return;

                const [__, quantityFrom, quantityTo] = qtyMatches;

                recipeIngredient.quantityFrom = +quantityFrom;
                recipeIngredient.quantityTo = +quantityTo;
            } else {
                recipeIngredient.quantityFrom = +quantity;
                recipeIngredient.quantityTo = undefined;
            }

            if (isNaN(recipeIngredient.quantityFrom) || (recipeIngredient.quantityTo && isNaN(recipeIngredient.quantityTo)))
                throw new QuantityStringError(section, recipeIngredient);
        }
    }
};

export const removeEmptyIngredientsAndSteps = (recipe: Recipe) => {
    for (const ingredientSection of recipe.ingredientSections ?? [])
        ingredientSection.recipeIngredients = ingredientSection.recipeIngredients?.filter(ri => !!ri.ingredient?.name?.trim());

    for (const section of recipe.sections ?? [])
        section.recipeSteps = section.recipeSteps?.filter(step => !!step?.content?.trim());

    recipe.ingredientSections = recipe.ingredientSections?.filter(s => s.recipeIngredients?.length !== 0);
    recipe.sections = recipe.sections?.filter(s => s.recipeSteps?.length !== 0);
};

export const validateRecipe = (recipe: Recipe) => {
    if (!recipe.name)
        throw new Error('Recipe name cannot be empty');

    if (!recipe.ingredientSections || recipe.ingredientSections.length === 0)
        throw new Error('Recipe has to have at least one ingredient section');

    if (!recipe.sections || recipe.sections.length === 0)
        throw new Error('Recipe has to have at least one section');
};

export const removeTemporaryIdsFromRecipe = (recipe: Recipe) => {
    forEachDeep(recipe, (key, value, parent) => {
        // eslint-disable-next-line yoda
        if (key === 'id' && typeof value === 'number' && 0 < value && value < 1)
            parent[key] = null;
    });
};
