import { Ingredient } from 'recipe-scrapper/lib/recipe';
import { parseIngredient } from './parseIngredient';

describe('parseIngredient', () => {
    it.each(
        [
            ['1 cebula,', { name: 'cebula', quantity: 1, unit: 'szt' }],
            ['2 z\u0105bki czosnku', { name: 'z\u0105bki czosnku', quantity: 2, unit: 'szt' }],
            ['3 ziela angielskie', { name: 'ziela angielskie', quantity: 3, unit: 'szt' }],
            ['2 li\u015bcie laurowe', { name:'li\u015bcie laurowe', quantity: 2, unit:'szt' }],
        ] as [string, Ingredient][]
    )('parses a ingredient with clear ingredient count separation and defaults to szt unit', (input, expected) => {
        expect(parseIngredient(input)).toEqual(expected);
    });

    it('parses an ingredient without quantity or unit', () => {
        expect(parseIngredient('s\u00f3l')).toEqual({ name: 's\u00f3l' });
    });

    it.each(
        [
            ['2/3 czerwonej soczewicy,', { name: 'czerwonej soczewicy', quantity: 0.667, unit: 'szt' }],
            ['1/2 ma\u0142ego selera,', { name: 'ma\u0142ego selera', quantity: 0.5, unit: 'szt' }],
            ['1/2 curry', { name: 'curry', quantity: 0.5, unit: 'szt' }],
        ] as [string, Ingredient][]
    )('parses an ingredient with fractional quantity', (input, expected) => {
        expect(parseIngredient(input)).toEqual(expected);
    });

    it.each(
        [
            ['1,5 wody', { name: 'wody', quantity: 1.5, unit: 'szt' }],
            ['1.5 wody', { name: 'wody', quantity: 1.5, unit: 'szt' }],
        ] as [string, Ingredient][]
    )('accepts both , and . as a decimal separator', (input, expected) => {
        expect(parseIngredient(input)).toEqual(expected);
    });


    it.each(
        [
            ['2-3 pokrojone w kostk\u0119 ziemniaki,', { name: 'pokrojone w kostk\u0119 ziemniaki', quantity: { from: 2, to: 3 }, unit: 'szt' }],
            ['1-2 pokrojone w kostk\u0119 marchewki,', { name: 'pokrojone w kostk\u0119 marchewki', quantity: { from: 1, to: 2 }, unit: 'szt' }],
        ] as [string, Ingredient][]
    )('parses a range type quantity', (input, expected) => {
        expect(parseIngredient(input)).toEqual(expected);
    });

    it.each(
        [
            ['2/3 szkl. czerwonej soczewicy,', { name: 'czerwonej soczewicy', quantity: 0.667, unit: 'szkl.' }],
            ['1,5 l wody', { name: 'wody', quantity: 1.5, unit: 'l' }],
            ['250ml przecieru pomidorowego', { name: 'przecieru pomidorowego', quantity: 250, unit: 'ml' }],
            ['1 \u0142y\u017ceczka majeranku', { name: 'majeranku', quantity: 1, unit: '\u0142y\u017ceczka' }],
            ['1\u0142y\u017ceczka s\u0142odkiej papryki', { name: 's\u0142odkiej papryki', quantity: 1, unit: '\u0142y\u017ceczka' }],
            ['1 \u0142y\u017ceczka oregano', { name: 'oregano', quantity: 1, unit: 'łyżeczka' }],
            ['1/2 \u0142y\u017ceczki curry', { name: 'curry', quantity: 0.5, unit: 'łyżeczki' }],
        ] as [string, Ingredient][]
    )('parses a unit as well as quantity', (input, expected) => {
        expect(parseIngredient(input)).toEqual(expected);
    });

    it('strips trailing punctuaction from name', () => {
        expect(parseIngredient('2/3 szkl. czerwonej soczewicy,')).toEqual(
            {
                name: 'czerwonej soczewicy',
                quantity: 0.667,
                unit: 'szkl.',
            } as Ingredient
        );
    });
});
