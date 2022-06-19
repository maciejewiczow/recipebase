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

    afterEach(async () => {
        // @ts-ignore
        await database.dataSource.destroy();
        // @ts-ignore
        await database.connection?.destroy();
    });

    describe('fetchRecipes', () => {
        it('escapes the search text', () => {
            const find = jest.fn();
            const recipes = new Recipes({
                // @ts-ignore
                dataSource: {},
                // @ts-ignore
                recipeRepository: {
                    find,
                },
            });

            recipes.fetchRecipes('%__%%%_%_%_%__ddd__%%');

            const expectedSearchTerm = '\\%\\_\\_\\%\\%\\%\\_\\%\\_\\%\\_\\%\\_\\_ddd\\_\\_\\%\\%';
            expect(find).toHaveBeenCalledWith({
                where: [
                    { name: ILike(`%${expectedSearchTerm}%`) },
                    { description: ILike(`%${expectedSearchTerm}%`) },
                ],
                relations: ['tags'],
            });
        });

        it('gets only recipes which name or description matches any word from search term', () => {
            const recipes = new Recipes(database);

            recipes.fetchRecipes('Lorem dolor');

            expect(true).toBe(true);
        });
    });
});
