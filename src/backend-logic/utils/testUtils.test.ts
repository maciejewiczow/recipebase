import cloneDeep from 'lodash/cloneDeep';
import { createMockData, MockData, TestDatabaseBuilder } from './testUtils';

describe('TestDatabaseBuilder', () => {
    let mockData: MockData;
    beforeEach(() => {
        TestDatabaseBuilder.init();
        mockData = createMockData();
    });

    afterEach(async () => {
        await TestDatabaseBuilder.cleanup();
    });

    it('creates an empty database', async () => {
        const database = await new TestDatabaseBuilder().build();

        await expect(database.ingredientRepository.find()).resolves.toHaveLength(0);
        await expect(database.ingredientSectionRepository.find()).resolves.toHaveLength(0);
        await expect(database.recipeRepository.find()).resolves.toHaveLength(0);
        await expect(database.recipeIngredientRepository.find()).resolves.toHaveLength(0);
        await expect(database.recipeSectionRepository.find()).resolves.toHaveLength(0);
        await expect(database.recipeStepRepository.find()).resolves.toHaveLength(0);
        await expect(database.tagRepository.find()).resolves.toHaveLength(0);
        await expect(database.unitRepository.find()).resolves.toHaveLength(0);
    });

    it('creates a filled database', async () => {
        const database = await new TestDatabaseBuilder().withContent(mockData).build();

        await expect(database.ingredientRepository.find()).resolves.toHaveLength(mockData.ingredients.length);
        await expect(database.recipeRepository.find()).resolves.toHaveLength(mockData.recipes.length);
        await expect(database.tagRepository.find()).resolves.toHaveLength(mockData.tags.length);
        await expect(database.unitRepository.find()).resolves.toHaveLength(mockData.units.length);
    });

    it('does not insert the specified recipe into the db', async () => {
        const database = await new TestDatabaseBuilder()
            .withContent(mockData, { skipRecipe: mockData.recipes[0] })
            .build();

        await expect(database.ingredientRepository.find()).resolves.toHaveLength(mockData.ingredients.length);
        await expect(database.recipeRepository.find()).resolves.toHaveLength(mockData.recipes.length - 1);
        await expect(database.tagRepository.find()).resolves.toHaveLength(mockData.tags.length);
        await expect(database.unitRepository.find()).resolves.toHaveLength(mockData.units.length);
    });

    it('does not insert the specified cloned recipe into the db', async () => {
        const database = await new TestDatabaseBuilder()
            .withContent(mockData, { skipRecipe: cloneDeep(mockData.recipes[0]) })
            .build();

        await expect(database.ingredientRepository.find()).resolves.toHaveLength(mockData.ingredients.length);
        await expect(database.recipeRepository.find()).resolves.toHaveLength(mockData.recipes.length - 1);
        await expect(database.tagRepository.find()).resolves.toHaveLength(mockData.tags.length);
        await expect(database.unitRepository.find()).resolves.toHaveLength(mockData.units.length);
    });

    it('soft deletes a recipe from the db', async () => {
        const database = await new TestDatabaseBuilder().withContent(mockData).withDeletedRecipe().build();

        await expect(database.recipeRepository.find()).resolves.toHaveLength(mockData.recipes.length - 1);
        await expect(database.recipeRepository.find({ withDeleted: true })).resolves.toHaveLength(
            mockData.recipes.length,
        );
    });
});
