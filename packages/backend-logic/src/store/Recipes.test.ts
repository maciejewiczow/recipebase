/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Database, Recipe } from 'backend-logic';
import { ILike } from 'typeorm';
import { initalizeTestDatabase, runPromiseGenerator } from '../utils/testUtils';
import { Recipes } from './Recipes';

describe('Recipes', () => {
    let database: Database;

    beforeEach(async () => {
        database = await initalizeTestDatabase();
    });

    describe('fetchRecipes', () => {
        it('escapes the search text', async () => {
            const find = jest.fn();
            const recipes = new Recipes({
                // @ts-ignore
                recipeRepository: {
                    find,
                },
            });

            await runPromiseGenerator(
                recipes.fetchRecipes('%__%%%_%_%_%__ddd__%%')
            );

            const expectedSearchTerm = '\\%\\_\\_\\%\\%\\%\\_\\%\\_\\%\\_\\%\\_\\_ddd\\_\\_\\%\\%';
            expect(find).toHaveBeenCalledWith({
                where: [
                    { name: ILike(`%${expectedSearchTerm}%`) },
                    { description: ILike(`%${expectedSearchTerm}%`) },
                ],
                relations: ['tags'],
            });
        });

        it('gets only recipes which description matches any word from search term', async () => {
            const recipes = new Recipes(database);

            await runPromiseGenerator(
                recipes.fetchRecipes('Lorem dolor')
            );

            expect(recipes.recipes.length).toBeGreaterThan(0);

            for (const recipe of recipes.recipes)
                expect(recipe.description).toMatch(/(lorem|dolor)/ig);
        });

        it('gets only recipes which name contains any word from the seach term', async () => {
            const recipes = new Recipes(database);

            await runPromiseGenerator(
                recipes.fetchRecipes('test ciacho')
            );

            expect(recipes.recipes.length).toBeGreaterThan(0);

            for (const recipe of recipes.recipes)
                expect(recipe.name).toMatch(/(test|ciacho)/ig);
        });

        it('sets the loading status to true when the recipes are loading', async () => {
            const recipes = new Recipes(database);

            expect(recipes.isFetchingRecipes).toBeFalsy();

            const gen = recipes.fetchRecipes('test');

            const val = await gen.next().value;

            expect(recipes.isFetchingRecipes).toBeTruthy();
            // @ts-ignore
            gen.next(val);

            expect(recipes.isFetchingRecipes).toBeFalsy();
        });

        it('loads tags for each recipe', async () => {
            const recipes = new Recipes(database);

            await runPromiseGenerator(recipes.fetchRecipes('test ciacho'));

            expect(recipes.recipes.length).toBeGreaterThan(0);

            for (const recipe of recipes.recipes)
                expect(recipe.tags).toBeDefined();
        });

        it('loads all recipes when the search term is empty or white space', async () => {
            const recipes = new Recipes(database);

            await runPromiseGenerator(
                recipes.fetchRecipes('  ')
            );

            expect(recipes.recipes.length).toBe((await database.recipeRepository?.find())?.length);
        });

        it('treats words in quotes as single search term', async () => {
            const recipes = new Recipes(database);

            await runPromiseGenerator(
                recipes.fetchRecipes('"Test recipe" "dobre ciacho"')
            );

            expect(recipes.recipes.length).toBeGreaterThan(0);

            for (const recipe of recipes.recipes)
                expect(recipe.name + recipe.description).toMatch(/(Test recipe|dobre ciacho)/ig);
        });
    });

    describe('filterRecipesByTags', () => {
        it('returns all the recipes when there are no selected tags', async () => {
            const recipes = new Recipes(database);

            await runPromiseGenerator(recipes.fetchRecipes(''));

            const filteredRecipes = recipes.filterRecipesByTags([]);

            expect(filteredRecipes).toEqual(recipes.recipes);
        });

        it('returns only recipes that have all of the selected tags', async () => {
            const recipes = new Recipes(database);

            await runPromiseGenerator(recipes.fetchRecipes(''));

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const tags = await database.tagRepository!.find();

            const filteredRecipes = recipes.filterRecipesByTags([
                { tag: { ...tags[0], recipeCount: 0 }, isSelected: true },
                { tag: { ...tags[1], recipeCount: 0 }, isSelected: true },
            ]);

            expect(filteredRecipes.length).toBeGreaterThan(0);

            for (const recipe of filteredRecipes) {
                expect(recipe.tags).toContainEqual(tags[0]);
                expect(recipe.tags).toContainEqual(tags[1]);
            }
        });
    });

    describe('fetchRecipeById', () => {
        it('sets currentRecipe to the recipe with given id, including all relations', async () => {
            const recipes = new Recipes(database);

            await runPromiseGenerator(recipes.fetchRecipeById(1));

            const loadedRecipe = recipes.currentRecipe;

            expect(loadedRecipe).toBeDefined();
            expect(loadedRecipe?.id).toBe(1);
            expect(loadedRecipe?.ingredientSections).toBeDefined();
            expect(loadedRecipe?.ingredientSections?.length).toBeGreaterThan(0);
            expect(loadedRecipe?.sections).toBeDefined();
            expect(loadedRecipe?.sections?.length).toBeGreaterThan(0);
            expect(loadedRecipe?.tags).toBeDefined();

            for (const section of loadedRecipe?.sections || [])
                expect(section.recipeSteps).toBeDefined();

            for (const ingredientSection of loadedRecipe?.ingredientSections || []){
                expect(ingredientSection.recipeIngredients).toBeDefined();

                for (const rcpIngredient of ingredientSection.recipeIngredients || []) {
                    expect(rcpIngredient.ingredient).toBeDefined();
                    expect(rcpIngredient.unit).toBeDefined();
                }
            }
        });

        it('sets isFetchingCurrentRecipe to true when the recipe is loading', async () => {
            const recipes = new Recipes(database);

            expect(recipes.isFetchingCurrentRecipe).toBeFalsy();

            const gen = recipes.fetchRecipeById(1);
            let genVal = gen.next();

            expect(recipes.isFetchingCurrentRecipe).toBeTruthy();

            // @ts-ignore
            genVal = gen.next(await genVal.value);
            // @ts-ignore
            genVal = gen.next(await genVal.value);

            expect(recipes.isFetchingCurrentRecipe).toBeFalsy();
        });

        it('loads coverImage in a separate query to avoid data duplication in relation joins', async () => {
            const recipes = new Recipes(database);

            const gen = recipes.fetchRecipeById(1);
            let genVal = gen.next();
            let recipe = (await genVal.value) as Recipe;

            expect(recipe.coverImage).toBeUndefined();

            // @ts-ignore
            genVal = gen.next(recipe);

            recipe = (await genVal.value) as Recipe;

            expect(recipe.coverImage).toBeDefined();
            // @ts-ignore
            genVal = gen.next(recipe);
        });
    });
});
