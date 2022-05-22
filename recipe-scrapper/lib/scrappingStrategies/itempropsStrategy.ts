import { parseIngredient } from 'utils/parseIngredient';
import { Strategy } from './strategy';

export const itempropsStrategy: Strategy = document => {
    const nameEl = document.querySelector('h1[itemprop=name]') ?? document.querySelector('h1');
    const descriptionEl = document.querySelector('[itemprop=description]');

    const stepElements = document.querySelectorAll('[itemprop=recipeInstructions]');

    let steps: string[];
    if (stepElements.length === 1) {
        const [el] = stepElements;

        steps = el.innerText.split('\n\n').map(x => x.trim()).filter(x => !!x);
    } else {
        steps = stepElements.map(el => el.innerText);
    }

    const ingredients = document.querySelectorAll('[itemprop=recipeIngredient]').map(el => parseIngredient(el.innerText));

    return {
        name: nameEl?.innerText,
        description: descriptionEl?.innerText,
        steps,
        ingredients,
    };
};
