import numericQuantity from 'numeric-quantity';
import { Ingredient, Range } from 'recipe-scrapper/lib/recipe';
import { names as unitNames } from './unitNames.json';

const parseQuantity = (quantity?: string): string | number | Range | undefined => {
    if (!quantity)
        return undefined;

    if (quantity.includes('-')) {
        const numberMatches = quantity.match(/(\d+)\s?-\s?(\d+)/);

        if (numberMatches && numberMatches.length > 2) {
            return {
                from: parseFloat(numberMatches[1]),
                to: parseFloat(numberMatches[2]),
            };
        }
    } else {
        return numericQuantity(quantity.replaceAll(',', '.'));
    }
};

const parseUnit = (nameWithUnit: string, hasQuantity: boolean, defaultUnit = 'szt') => {
    const firstWordMatch = nameWithUnit.match(/^(\S+) /);

    if (!firstWordMatch || firstWordMatch.length < 2) {
        return {
            name: nameWithUnit,
            unit: hasQuantity ? defaultUnit : undefined,
        };
    }

    const [_, firstWord] = firstWordMatch;

    const unitMatcher = (unitName: string) => firstWord === unitName || unitName.startsWith(firstWord.replaceAll('.', ''));

    if (unitNames.find(unitMatcher)) {
        return {
            name: nameWithUnit.replace(firstWord, '').trim(),
            unit: firstWord.trim(),
        };
    }

    return {
        name: nameWithUnit,
        unit: defaultUnit,
    };
};

export const parseIngredient = (ingredientStr: string): Ingredient => {
    const quantityRegex = /^([\d/\-,.]+)/;

    const nameWithUnit = ingredientStr.replace(quantityRegex, '').trim().replaceAll(/[,.;'"]$/g, '');
    const quantity = parseQuantity(ingredientStr.match(quantityRegex)?.[1]);

    const { name, unit } = parseUnit(nameWithUnit, !!quantity);

    if (!quantity)
        return { name: nameWithUnit };

    return { name, quantity, unit };
};

