import { Recipe } from 'recipe';
import { findInObject } from 'utils/findInObject';
import { parseIngredient } from 'utils/parseIngredient';
import { Strategy } from './strategy';

export const jsonLdStrategy: Strategy = document => {
    const scripts = document.querySelectorAll('script[type=application\\/ld\\+json]');

    if (!scripts.length)
        return {};

    let recipeObj;
    for (const script of scripts) {
        const jsonLd = JSON.parse(script.innerText);

        recipeObj = findInObject(jsonLd, o => typeof o === 'object' && '@type' in o && o['@type'] === 'Recipe');

        if (recipeObj !== undefined)
            break;
    }

    if (!recipeObj)
        return {};

    if (typeof recipeObj.recipeInstructions === 'string')
        recipeObj.recipeInstructions = recipeObj?.recipeInstructions?.split('\n')?.map((x: string) => x.trim())?.filter((x: string) => x.length > 0);

    const recipe: Partial<Recipe> = {
        name: recipeObj?.name,
        description: recipeObj?.description || undefined,
        ingredients: recipeObj?.recipeIngredient?.map(parseIngredient),
        steps: recipeObj?.recipeInstructions?.map((instr: any) => (typeof instr === 'object' ? instr?.text : instr)),
    };

    return recipe;
};
