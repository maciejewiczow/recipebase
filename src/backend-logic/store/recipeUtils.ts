import { numericQuantity } from 'numeric-quantity';
import invariant from 'tiny-invariant';
import { Database } from '../Database';
import { Ingredient } from '../entities/Ingredient';
import { IngredientSection } from '../entities/IngredientSection';
import { Recipe } from '../entities/Recipe';
import { RecipeSection } from '../entities/RecipeSection';
import { RecipeStep } from '../entities/RecipeStep';
import { Unit } from '../entities/Unit';

const qtyParsingRegex = /(\d+(?:[./]\d+)?)\s*-\s*(\d+(?:[./]\d+)?)/;

type ParseQuantityStringResult = [from: number | undefined, to: number | undefined];

export const parseQuantityString = (quantityString: string): ParseQuantityStringResult => {
    if (qtyParsingRegex.test(quantityString)) {
        const qtyMatches = quantityString.match(qtyParsingRegex);

        invariant(!!qtyMatches, `qtyMatches were null, quanityString: ${quantityString}`);

        const [_, quantityFrom, quantityTo] = qtyMatches;

        return [numericQuantity(quantityFrom), numericQuantity(quantityTo)];
    } else if (quantityString) {
        return [numericQuantity(quantityString), undefined];
    } else {
        return [undefined, undefined];
    }
};

export const removeEmptyIngredientsAndSteps = (recipe: Recipe) => {
    for (const ingredientSection of recipe.ingredientSections ?? []) {
        ingredientSection.recipeIngredients = ingredientSection.recipeIngredients?.filter(
            ri => !!ri.ingredient?.name?.trim(),
        );
    }

    for (const section of recipe.sections ?? []) {
        section.recipeSteps = section.recipeSteps?.filter(step => !!step?.content?.trim());
    }

    recipe.ingredientSections = recipe.ingredientSections?.filter(s => s.recipeIngredients?.length !== 0);
    recipe.sections = recipe.sections?.filter(s => s.recipeSteps?.length !== 0);
};

export const validateRecipe = (recipe: Recipe) => {
    if (!recipe.name) {
        throw new Error('Recipe name cannot be empty');
    }

    if (!recipe.ingredientSections || recipe.ingredientSections.length === 0) {
        throw new Error('Recipe has to have at least one ingredient section');
    }

    if (!recipe.sections || recipe.sections.length === 0) {
        throw new Error('Recipe has to have at least one section');
    }
};

export const saveRecipe = (recipe: Recipe, database: Database) =>
    database.transaction(async manager => {
        for (const ingredientSection of recipe.ingredientSections ?? []) {
            const usedIngredients = new Set<Ingredient>();
            for (const recipeIngredient of ingredientSection.recipeIngredients ?? []) {
                if (recipeIngredient.unit) {
                    const existingUnit = await manager.getRepository(Unit).findOne({
                        withDeleted: true,
                        where: {
                            name: recipeIngredient.unit.name,
                        },
                    });

                    if (existingUnit) {
                        existingUnit.deletedAt = null;
                        recipeIngredient.unit = existingUnit;
                    }

                    await manager.getRepository(Unit).save(recipeIngredient.unit);
                }

                if (recipeIngredient.ingredient) {
                    const exsitingIngredient = await manager.getRepository(Ingredient).findOne({
                        withDeleted: true,
                        where: {
                            name: recipeIngredient.ingredient.name,
                        },
                    });

                    if (exsitingIngredient) {
                        exsitingIngredient.deletedAt = null;
                        recipeIngredient.ingredient = exsitingIngredient;
                    }

                    // TODO: move this to the validation step
                    if (usedIngredients.has(recipeIngredient.ingredient)) {
                        throw new Error('The same ingredient cannot be used twice in one section');
                    } else {
                        usedIngredients.add(recipeIngredient.ingredient);
                    }

                    await manager.getRepository(Ingredient).save(recipeIngredient.ingredient);
                }
            }

            await manager.getRepository(IngredientSection).save(ingredientSection);
        }

        for (const recipeSection of recipe.sections ?? []) {
            const section = await manager.getRepository(RecipeSection).save(recipeSection);
            await manager.getRepository(RecipeStep).save(section.recipeSteps ?? []);
        }

        return manager.getRepository(Recipe).save(recipe);
    });
