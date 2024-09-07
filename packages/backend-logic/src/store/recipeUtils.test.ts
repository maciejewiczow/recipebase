/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { mockData, TestDatabaseBuilder } from '../utils/testUtils';
import { CurrentRecipe } from './CurrentRecipe';
import { parseQuantityString, saveRecipe } from './recipeUtils';

describe('parseQuantityStringsToIngredientQuantities', () => {
    interface TestCaseData {
        quantityString: string;
        expected: {
            quantityFrom: number;
            quantityTo: number | undefined;
        };
    }

    it.each<TestCaseData>([
        {
            quantityString: '12',
            expected: {
                quantityFrom: 12,
                quantityTo: undefined,
            },
        },
        {
            quantityString: '69',
            expected: {
                quantityFrom: 69,
                quantityTo: undefined,
            },
        },
        {
            quantityString: '12-13',
            expected: {
                quantityFrom: 12,
                quantityTo: 13,
            },
        },
        {
            quantityString: '12 - 13',
            expected: {
                quantityFrom: 12,
                quantityTo: 13,
            },
        },
        {
            quantityString: '1/2',
            expected: {
                quantityFrom: 1 / 2,
                quantityTo: undefined,
            },
        },
        {
            quantityString: '12.5',
            expected: {
                quantityFrom: 12.5,
                quantityTo: undefined,
            },
        },
        {
            quantityString: '12.5-420.69',
            expected: {
                quantityFrom: 12.5,
                quantityTo: 420.69,
            },
        },
        {
            quantityString: '12.5 - 420.69',
            expected: {
                quantityFrom: 12.5,
                quantityTo: 420.69,
            },
        },
        {
            quantityString: '3/4 - 5/6',
            expected: {
                quantityFrom: 3 / 4,
                quantityTo: 5 / 6,
            },
        },
        {
            quantityString: '12.5 - 69/420',
            expected: {
                quantityFrom: 12.5,
                quantityTo: 69 / 420,
            },
        },
    ])("parses '$quantityString' correctly", ({ quantityString, expected }) => {
        const result = parseQuantityString(quantityString);

        expect(result.quantityFrom).toBeCloseTo(expected.quantityFrom);

        if (expected.quantityTo !== undefined) {
            expect(result.quantityTo).toBeCloseTo(expected.quantityTo);
        } else {
            expect(result.quantityTo).toBeUndefined();
        }
    });
});

describe('saveRecipe', () => {
    it('saves the recipe to an empty database', async () => {
        const { database, cleanup } = await new TestDatabaseBuilder().build();

        await saveRecipe(mockData.recipes[0], database);

        expect(await database.recipeRepository.find()).toHaveLength(1);

        const currentRecipeStore = new CurrentRecipe(database);

        await currentRecipeStore.fetchRecipeById(1);

        expect(currentRecipeStore.recipe).toBeTruthy();
        expect(currentRecipeStore.recipe?.tags?.length).toBeGreaterThan(0);
        expect(currentRecipeStore.recipe?.ingredientSections?.length).toBeGreaterThan(0);
        expect(currentRecipeStore.recipe?.sections?.length).toBeGreaterThan(0);

        await cleanup();
    });

    it('saves the recipe to a database that already has some other recipes', async () => {
        const { database } = await new TestDatabaseBuilder().withContent().build();

        expect(await database.unitRepository.find()).toHaveLength(0);
    });
    it.todo('saves the recipe that uses some ingredients and units already present in the db');
    it.todo('saves the recipe that uses a soft deleted unit to the db');
    it.todo('saves the recipe that uses a soft deleted ingredient');
});
