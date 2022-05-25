import mergeWith from 'lodash.mergewith';
import parse from 'node-html-parser';
import { Recipe } from './recipe';
import strategies from './scrappingStrategies';

export const scrap = (markup: string): Recipe | undefined => {
    const document = parse(markup);

    let recipe: Partial<Recipe> = {};
    for (const strategy of strategies) {
        const newRecipe = strategy(document);

        recipe = mergeWith(recipe, newRecipe, (current, New) => (current === undefined || (Array.isArray(current) && current.length === 0) ? New : current));

        if (recipe.ingredients?.length && recipe.steps?.length && recipe.name)
            return recipe as Recipe;
    }
};
