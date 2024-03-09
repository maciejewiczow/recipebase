/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Database } from 'backend-logic';
import { ILike } from 'typeorm';
import { initalizeTestDatabase } from '../utils/testUtils';
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

            await recipes.fetchRecipes('%__%%%_%_%_%__ddd__%%');

            const expectedSearchTerm =
                '\\%\\_\\_\\%\\%\\%\\_\\%\\_\\%\\_\\%\\_\\_ddd\\_\\_\\%\\%';
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

            await recipes.fetchRecipes('Lorem dolor');

            expect(recipes.recipes.length).toBeGreaterThan(0);

            for (const recipe of recipes.recipes)
                {expect(recipe.description).toMatch(/(lorem|dolor)/gi);}
        });

        it('gets only recipes which name contains any word from the seach term', async () => {
            const recipes = new Recipes(database);

            await recipes.fetchRecipes('test ciacho');

            expect(recipes.recipes.length).toBeGreaterThan(0);

            for (const recipe of recipes.recipes)
                {expect(recipe.name).toMatch(/(test|ciacho)/gi);}
        });

        it.todo(
            'sets the loading status to true when the recipes are loading',
            async () => {
                const recipes = new Recipes(database);

                expect(recipes.isFetchingRecipes).toBeFalsy();

                const promise = recipes.fetchRecipes('test');

                expect(recipes.isFetchingRecipes).toBeTruthy();

                await promise;

                expect(recipes.isFetchingRecipes).toBeFalsy();
            },
        );

        it('loads tags for each recipe', async () => {
            const recipes = new Recipes(database);

            await recipes.fetchRecipes('test ciacho');

            expect(recipes.recipes.length).toBeGreaterThan(0);

            for (const recipe of recipes.recipes)
                {expect(recipe.tags).toBeDefined();}
        });

        it('loads all recipes when the search term is empty or white space', async () => {
            const recipes = new Recipes(database);

            await recipes.fetchRecipes('  ');

            expect(recipes.recipes.length).toBe(
                (await database.recipeRepository.find()).length,
            );
        });

        it('treats words in quotes as single search term', async () => {
            const recipes = new Recipes(database);

            await recipes.fetchRecipes('"Test recipe" "dobre ciacho"');

            expect(recipes.recipes.length).toBeGreaterThan(0);

            for (const recipe of recipes.recipes)
                {expect(recipe.name + recipe.description).toMatch(
                    /(Test recipe|dobre ciacho)/gi,
                );}
        });
    });

    describe('filterRecipesByTags', () => {
        it('returns all the recipes when there are no selected tags', async () => {
            const recipes = new Recipes(database);

            await recipes.fetchRecipes('');

            const filteredRecipes = recipes.filterRecipesByTags([]);

            expect(filteredRecipes).toEqual(recipes.recipes);
        });

        it('returns only recipes that have all of the selected tags', async () => {
            const recipes = new Recipes(database);

            await recipes.fetchRecipes('');

            const tags = await database.tagRepository.find();

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
});
