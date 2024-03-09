import { numericQuantity } from 'numeric-quantity';
import invariant from 'tiny-invariant';
import Database from '../Database';
import Ingredient from '../entities/Ingredient';
import IngredientSection from '../entities/IngredientSection';
import Recipe from '../entities/Recipe';
import RecipeIngredient from '../entities/RecipeIngredient';
import RecipeSection from '../entities/RecipeSection';
import RecipeStep from '../entities/RecipeStep';
import Unit from '../entities/Unit';

const qtyParsingRegex = /(\d+(?:[./]\d+)?)\s*-\s*(\d+(?:[./]\d+)?)/;

export const parseQuantityString = (quantityString: string) => {
    if (qtyParsingRegex.test(quantityString)) {
        const qtyMatches = quantityString.match(qtyParsingRegex);

        invariant(
            !!qtyMatches,
            `qtyMatches were null, quanittyString: ${quantityString}`,
        );

        const [_, quantityFrom, quantityTo] = qtyMatches;

        return {
            quantityFrom: numericQuantity(quantityFrom),
            quantityTo: numericQuantity(quantityTo),
        };
    } else {
        return {
            quantityFrom: numericQuantity(quantityString),
            quantityTo: undefined,
        };
    }
};

export const removeEmptyIngredientsAndSteps = (recipe: Recipe) => {
    for (const ingredientSection of recipe.ingredientSections ?? [])
        {ingredientSection.recipeIngredients =
            ingredientSection.recipeIngredients?.filter(
                ri => !!ri.ingredient?.name?.trim(),
            );}

    for (const section of recipe.sections ?? [])
        {section.recipeSteps = section.recipeSteps?.filter(
            step => !!step?.content?.trim(),
        );}

    recipe.ingredientSections = recipe.ingredientSections?.filter(
        s => s.recipeIngredients?.length !== 0,
    );
    recipe.sections = recipe.sections?.filter(s => s.recipeSteps?.length !== 0);
};

export const validateRecipe = (recipe: Recipe) => {
    if (!recipe.name) {throw new Error('Recipe name cannot be empty');}

    if (!recipe.ingredientSections || recipe.ingredientSections.length === 0)
        {throw new Error('Recipe has to have at least one ingredient section');}

    if (!recipe.sections || recipe.sections.length === 0)
        {throw new Error('Recipe has to have at least one section');}
};

export const saveRecipe = (recipe: Recipe, database: Database) => database.transaction(async manager => {
        const promises: Promise<any>[] = [];

        for (const ingredientSection of recipe.ingredientSections ?? []) {
            for (const recipeIngredient of ingredientSection.recipeIngredients ??
                []) {
                if (recipeIngredient.ingredient)
                    {promises.push(
                        manager
                            .getRepository(Ingredient)
                            .save(recipeIngredient.ingredient),
                    );}

                if (recipeIngredient.unit)
                    {promises.push(
                        manager.getRepository(Unit).save(recipeIngredient.unit),
                    );}

                promises.push(
                    manager
                        .getRepository(RecipeIngredient)
                        .save(recipeIngredient),
                );
            }
            promises.push(
                manager
                    .getRepository(IngredientSection)
                    .save(ingredientSection),
            );
        }

        for (const recipeSection of recipe.sections ?? []) {
            promises.push(
                manager
                    .getRepository(RecipeStep)
                    .save(recipeSection.recipeSteps ?? []),
            );
            promises.push(
                manager.getRepository(RecipeSection).save(recipeSection),
            );
        }

        await Promise.all(promises);

        return manager.getRepository(Recipe).save(recipe);
    });
