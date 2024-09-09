/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { cloneDeep } from 'lodash';
import { RecipeIngredient } from '../entities/RecipeIngredient';
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
    beforeAll(() => {
        TestDatabaseBuilder.init();
    });

    afterEach(async () => {
        await TestDatabaseBuilder.cleanup();
    });

    it('saves the recipe to an empty database', async () => {
        const [recipe] = mockData.recipes;
        const database = await new TestDatabaseBuilder().build();

        await saveRecipe(recipe, database);

        expect(await database.recipeRepository.find()).toHaveLength(1);

        const currentRecipeStore = new CurrentRecipe(database);

        await currentRecipeStore.fetchRecipeById(recipe.id);

        expect(currentRecipeStore.recipe).toBeTruthy();
        expect(currentRecipeStore.recipe?.tags?.length).toBeGreaterThan(0);
        expect(currentRecipeStore.recipe?.ingredientSections?.length).toBeGreaterThan(0);
        expect(currentRecipeStore.recipe?.sections?.length).toBeGreaterThan(0);
    });

    it('saves the recipe to a database that already has some other recipes', async () => {
        // eslint-disable-next-line prefer-destructuring
        const recipe = mockData.recipes[1];
        const database = await new TestDatabaseBuilder().withContent({ skipRecipe: recipe }).build();

        await saveRecipe(recipe, database);

        const currentRecipeStore = new CurrentRecipe(database);

        await currentRecipeStore.fetchRecipeById(recipe.id);

        expect(currentRecipeStore.recipe).toBeTruthy();
        expect(currentRecipeStore.recipe?.tags?.length).toBeGreaterThan(0);
        expect(currentRecipeStore.recipe?.ingredientSections?.length).toBeGreaterThan(0);
        expect(currentRecipeStore.recipe?.sections?.length).toBeGreaterThan(0);
    });

    it('saves the recipe that uses some ingredients and units already present in the db', async () => {
        const recipe = cloneDeep(mockData.recipes[0]);
        const database = await new TestDatabaseBuilder().withContent({ skipRecipe: recipe }).build();

        const ingredient = await database.ingredientRepository.findOneBy({ id: 1 });
        const unit = await database.unitRepository.findOneBy({ id: 1 });

        expect(ingredient).not.toBeNull();
        expect(unit).not.toBeNull();

        const ri = RecipeIngredient.createWithTemporaryId();

        ri.ingredient = ingredient!;
        ri.unit = unit!;
        ri.quantityFrom = 2;

        recipe.ingredientSections?.[0].recipeIngredients?.push(ri);

        expect(async () => await saveRecipe(recipe, database)).not.toThrow();
    });
    it.todo('saves the recipe that uses a soft deleted unit to the db');
    it.todo('saves the recipe that uses a soft deleted ingredient');
    it.todo('saves a recipe that has the same ingredient in multiple ingredient sections');
});
