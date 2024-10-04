/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Ingredient } from '../entities/Ingredient';
import { RecipeIngredient } from '../entities/RecipeIngredient';
import { Unit } from '../entities/Unit';
import { createMockData, MockData, TestDatabaseBuilder } from '../utils/testUtils';
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
    const recipeIndicies = [0, 1, 2, 3];
    let mockData: MockData;
    beforeEach(() => {
        TestDatabaseBuilder.init();
        mockData = createMockData();
    });

    afterEach(async () => {
        await TestDatabaseBuilder.cleanup();
    });

    it.each(recipeIndicies)('saves the recipe to an empty database', async recipeIndex => {
        const recipe = mockData.recipes[recipeIndex];

        const database = await new TestDatabaseBuilder().build();

        await expect(saveRecipe(recipe, database)).resolves.not.toThrow();

        expect(await database.recipeRepository.find()).toHaveLength(1);

        const currentRecipeStore = new CurrentRecipe(database);

        await currentRecipeStore.fetchRecipeById(recipe.id);

        expect(currentRecipeStore.recipe).toBeTruthy();
        expect(currentRecipeStore.recipe?.tags?.length).toBeGreaterThan(0);
        expect(currentRecipeStore.recipe?.ingredientSections?.length).toBeGreaterThan(0);
        expect(currentRecipeStore.recipe?.sections?.length).toBeGreaterThan(0);
    });

    it.each(recipeIndicies)(
        'saves the recipe to a database that already has some other recipes',
        async recipeIndex => {
            const recipe = mockData.recipes[recipeIndex];

            const database = await new TestDatabaseBuilder()
                .withContent(mockData, { skipRecipe: recipe })
                .build();

            await expect(saveRecipe(recipe, database)).resolves.not.toThrow();

            const currentRecipeStore = new CurrentRecipe(database);

            await currentRecipeStore.fetchRecipeById(recipe.id);

            expect(currentRecipeStore.recipe).toBeTruthy();
            expect(currentRecipeStore.recipe?.tags?.length).toBeGreaterThan(0);
            expect(currentRecipeStore.recipe?.ingredientSections?.length).toBeGreaterThan(0);
            expect(currentRecipeStore.recipe?.sections?.length).toBeGreaterThan(0);
        },
    );

    it.each(recipeIndicies)(
        'saves the recipe that uses some ingredients and units already present in the db',
        async recipeIndex => {
            const recipe = mockData.recipes[recipeIndex];
            const database = await new TestDatabaseBuilder()
                .withContent(mockData, { skipRecipe: recipe })
                .build();

            const ingredient = await database.ingredientRepository.findOneBy({ id: 1 });
            const unit = await database.unitRepository.findOneBy({ id: 1 });

            expect(ingredient).not.toBeNull();
            expect(unit).not.toBeNull();

            const ri = new RecipeIngredient();

            ri.ingredient = ingredient!;
            ri.unit = unit!;
            ri.quantityFrom = 2;

            recipe.ingredientSections?.[0].recipeIngredients?.push(ri);

            const promise = saveRecipe(recipe, database);

            await expect(promise).resolves.not.toThrow();
        },
    );

    it('saves the recipe that uses a soft deleted unit to the db', async () => {
        // eslint-disable-next-line prefer-destructuring
        const recipe = mockData.recipes[1];
        const database = await new TestDatabaseBuilder()
            .withContent(mockData, { skipRecipe: recipe })
            .withDeletedRecipe()
            .build();

        const [unit] = await database.unitRepository.find({ withDeleted: true });

        const ri = new RecipeIngredient();

        // eslint-disable-next-line prefer-destructuring
        ri.ingredient = mockData.ingredients[3];
        ri.quantityFrom = 21;
        ri.quantityTo = 37;
        ri.unit = unit!;

        recipe.ingredientSections?.[0].recipeIngredients?.push(ri);

        const promise = saveRecipe(recipe, database);

        await expect(promise).resolves.not.toThrow();
    });

    it('saves the recipe that uses a soft deleted ingredient', async () => {
        // eslint-disable-next-line prefer-destructuring
        const recipe = mockData.recipes[1];
        const database = await new TestDatabaseBuilder()
            .withContent(mockData, { skipRecipe: recipe })
            .withDeletedRecipe()
            .build();

        const [ingredient] = await database.ingredientRepository.find({
            withDeleted: true,
        });

        const ri = new RecipeIngredient();

        ri.ingredient = ingredient!;
        ri.quantityFrom = 21;
        ri.quantityTo = 37;
        // eslint-disable-next-line prefer-destructuring
        ri.unit = mockData.units[0];

        recipe.ingredientSections?.[0].recipeIngredients?.push(ri);

        const promise = saveRecipe(recipe, database);

        await expect(promise).resolves.not.toThrow();
    });

    it('saves a recipe that has the same new ingredient in multiple ingredient sections', async () => {
        // eslint-disable-next-line prefer-destructuring
        const recipe = mockData.recipes[0];
        const database = await new TestDatabaseBuilder().build();

        const ingredient = new Ingredient();
        ingredient.name = 'Test';

        const unit = new Unit();
        unit.name = 'Test unit';

        const ri1 = new RecipeIngredient();

        ri1.ingredient = ingredient;
        ri1.quantityFrom = 21;
        ri1.unit = unit;

        recipe.ingredientSections?.[0].recipeIngredients?.push(ri1);

        const ri2 = new RecipeIngredient();

        ri2.ingredient = ingredient;
        ri2.quantityFrom = 37;
        ri2.unit = unit;

        recipe.ingredientSections?.[1].recipeIngredients?.push(ri2);

        const promise = saveRecipe(recipe, database);

        await expect(promise).resolves.not.toThrow();
    });

    it('saves a recipe that has the same existing ingredient in multiple ingredient sections', async () => {
        // eslint-disable-next-line prefer-destructuring
        const recipe = mockData.recipes[0];
        const database = await new TestDatabaseBuilder()
            .withContent(mockData, { skipRecipe: recipe })
            .build();

        const [ingredient] = await database.ingredientRepository.find();

        const unit = new Unit();
        unit.name = 'Test unit';

        const ri1 = new RecipeIngredient();

        ri1.ingredient = ingredient;
        ri1.quantityFrom = 21;
        ri1.unit = unit;

        recipe.ingredientSections?.[0].recipeIngredients?.push(ri1);

        const ri2 = new RecipeIngredient();

        ri2.ingredient = ingredient;
        ri2.quantityFrom = 37;
        ri2.unit = unit;

        recipe.ingredientSections?.[1].recipeIngredients?.push(ri2);

        const promise = saveRecipe(recipe, database);

        await expect(promise).resolves.not.toThrow();
    });

    it('throws when there is the same ingredient in the same section twice', async () => {
        // eslint-disable-next-line prefer-destructuring
        const recipe = mockData.recipes[0];
        const database = await new TestDatabaseBuilder()
            .withContent(mockData, { skipRecipe: recipe })
            .build();

        const [ingredient] = await database.ingredientRepository.find();

        const unit = new Unit();
        unit.name = 'Test unit';

        const ri1 = new RecipeIngredient();

        ri1.ingredient = ingredient;
        ri1.quantityFrom = 21;
        ri1.unit = unit;

        recipe.ingredientSections?.[0].recipeIngredients?.push(ri1);

        const ri2 = new RecipeIngredient();

        ri2.ingredient = ingredient;
        ri2.quantityFrom = 37;
        ri2.unit = unit;

        recipe.ingredientSections?.[0].recipeIngredients?.push(ri2);

        const promise = saveRecipe(recipe, database);

        await expect(promise).rejects.toThrow();
    });
});
