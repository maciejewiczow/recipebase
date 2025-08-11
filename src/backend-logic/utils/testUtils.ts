/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    Database,
    Ingredient,
    IngredientSection,
    Recipe,
    RecipeIngredient,
    RecipeSection,
    RecipeStep,
    Tag,
    Unit,
} from 'backend-logic';
import sqlite3 from 'sqlite3';
import { DataSource, EntityManager } from 'typeorm';

export const createMockData = () => {
    const tags: Partial<Tag>[] = [
        { name: 'tag 1' },
        { name: 'tag 2' },
        { name: 'tag 3' },
        { name: 'tag 4' },
        { name: 'tag 5' },
        { name: 'tag 6' },
        { name: 'tag 7' },
        { name: 'tag 8' },
        { name: 'tag 9' },
        { name: 'tag 10' },
        { name: 'tag 11' },
        { name: 'tag 12' },
        { name: 'tag 13' },
    ];

    const units: Unit[] = [
        // @ts-expect-error other fields are from the db
        { name: 'unit 1' },
        // @ts-expect-error other fields are from the db
        { name: 'unit 2' },
        // @ts-expect-error other fields are from the db
        { name: 'unit 3' },
        // @ts-expect-error other fields are from the db
        { name: 'unit 4' },
        // @ts-expect-error other fields are from the db
        { name: 'unit 5' },
        // @ts-expect-error other fields are from the db
        { name: 'unit 6' },
        // @ts-expect-error other fields are from the db
        { name: 'unit 7' },
        // @ts-expect-error other fields are from the db
        { name: 'unit 8' },
        // @ts-expect-error other fields are from the db
        { name: 'unit 9' },
        // @ts-expect-error other fields are from the db
        { name: 'unit 10' },
        // @ts-expect-error other fields are from the db
        { name: 'unit 11' },
    ];

    const ingredients: Ingredient[] = [
        // @ts-expect-error id should be missing
        { name: 'ingredient 1' },
        // @ts-expect-error id should be missing
        { name: 'ingredient 2' },
        // @ts-expect-error id should be missing
        { name: 'ingredient 3' },
        // @ts-expect-error id should be missing
        { name: 'ingredient 4' },
        // @ts-expect-error id should be missing
        { name: 'ingredient 5' },
        // @ts-expect-error id should be missing
        { name: 'ingredient 6' },
        // @ts-expect-error id should be missing
        { name: 'ingredient 7' },
        // @ts-expect-error id should be missing
        { name: 'ingredient 8' },
        // @ts-expect-error id should be missing
        { name: 'ingredient 9' },
        // @ts-expect-error id should be missing
        { name: 'ingredient 10' },
        // @ts-expect-error id should be missing
        { name: 'ingredient 11' },
        // @ts-expect-error id should be missing
        { name: 'ingredient 12' },
        // @ts-expect-error id should be missing
        { name: 'ingredient 13' },
    ];

    const recipes: Recipe[] = [
        {
            id: 1,
            coverImage: '',
            description: 'Lorem ipsum test test test',
            name: 'Test recipe 1',
            tags: [
                // @ts-ignore
                tags[0],
                // @ts-ignore
                tags[1],
                // @ts-ignore
                tags[2],
            ],
            ingredientSections: [
                {
                    name: 'Ingredient section 1',
                    recipeIngredients: [
                        // @ts-expect-error
                        {
                            ingredient: ingredients[0],
                            quantityFrom: 3,
                            unit: units[0],
                        },
                        // @ts-expect-error
                        {
                            ingredient: ingredients[6],
                            quantityFrom: 2.5,
                            unit: units[4],
                        },
                        // @ts-expect-error
                        {
                            ingredient: ingredients[2],
                            quantityFrom: 3,
                            quantityTo: 5,
                            unit: units[2],
                        },
                    ],
                },
                {
                    name: 'Ingredient section 2',
                    recipeIngredients: [
                        // @ts-expect-error
                        {
                            ingredient: ingredients[1],
                            quantityFrom: 3,
                            unit: units[1],
                        },
                        // @ts-expect-error
                        {
                            ingredient: ingredients[5],
                            quantityFrom: 400,
                            unit: units[11],
                        },
                        // @ts-expect-error
                        {
                            ingredient: ingredients[8],
                            quantityFrom: 40,
                            quantityTo: 60,
                            unit: units[9],
                        },
                        // @ts-expect-error
                        {
                            ingredient: ingredients[10],
                            quantityFrom: 1,
                            unit: units[2],
                        },
                    ],
                },
            ],
            sections: [
                {
                    name: null,
                    recipeSteps: [
                        // @ts-ignore
                        { content: 'step 1' },
                        // @ts-ignore
                        { content: 'step 2' },
                        // @ts-ignore
                        { content: 'step 3' },
                        // @ts-ignore
                        { content: 'step 4' },
                        // @ts-ignore
                        { content: 'step 5' },
                    ],
                },
            ],
        },
        {
            id: 2,
            coverImage: '',
            description: 'Bardzo przekonujący opis 2',
            name: 'Test recipe 2',
            tags: [
                // @ts-ignore
                tags[2],
                // @ts-ignore
                tags[5],
                // @ts-ignore
                tags[7],
                // @ts-ignore
                tags[8],
            ],
            ingredientSections: [
                {
                    name: null,
                    recipeIngredients: [
                        // @ts-expect-error
                        {
                            ingredient: ingredients[0],
                            quantityFrom: 3,
                            unit: units[0],
                        },
                        // @ts-expect-error
                        {
                            ingredient: ingredients[6],
                            quantityFrom: 2.5,
                            unit: units[4],
                        },
                    ],
                },
            ],
            sections: [
                {
                    name: null,
                    recipeSteps: [
                        // @ts-ignore
                        { content: 'step 1' },
                        // @ts-ignore
                        { content: 'step 2' },
                        // @ts-ignore
                        { content: 'step 3' },
                        // @ts-ignore
                        { content: 'step 4' },
                        // @ts-ignore
                        { content: 'step 5' },
                        // @ts-ignore
                        { content: 'step 6' },
                        // @ts-ignore
                        { content: 'step 7' },
                        // @ts-ignore
                        { content: 'step 8' },
                        // @ts-ignore
                        { content: 'step 9' },
                    ],
                },
            ],
        },
        {
            id: 3,
            coverImage: '',
            description: 'Dobre ciacho',
            name: 'Test recipe 3',
            tags: [
                // @ts-ignore
                tags[2],
                // @ts-ignore
                tags[1],
                // @ts-ignore
                tags[10],
                // @ts-ignore
                tags[8],
                // @ts-ignore
                tags[11],
            ],
            ingredientSections: [
                {
                    name: null,
                    recipeIngredients: [
                        // @ts-expect-error
                        {
                            ingredient: ingredients[0],
                            quantityFrom: 3,
                            unit: units[0],
                        },
                        // @ts-expect-error
                        {
                            ingredient: ingredients[6],
                            quantityFrom: 2.5,
                            unit: units[4],
                        },
                    ],
                },
            ],
            sections: [
                {
                    name: 'Section 1',
                    recipeSteps: [
                        // @ts-ignore
                        { content: 'step 1' },
                        // @ts-ignore
                        { content: 'step 2' },
                        // @ts-ignore
                        { content: 'step 3' },
                        // @ts-ignore
                        { content: 'step 4' },
                        // @ts-ignore
                        { content: 'step 5' },
                        // @ts-ignore
                        { content: 'step 6' },
                        // @ts-ignore
                        { content: 'step 7' },
                        // @ts-ignore
                        { content: 'step 8' },
                        // @ts-ignore
                        { content: 'step 9' },
                        // @ts-ignore
                        { content: 'step 10' },
                        // @ts-ignore
                        { content: 'step 11' },
                        // @ts-ignore
                        { content: 'step 12' },
                        // @ts-ignore
                        { content: 'step 13' },
                        // @ts-ignore
                        { content: 'step 14' },
                        // @ts-ignore
                        { content: 'step 15' },
                    ],
                },
                {
                    name: 'Section 2',
                    recipeSteps: [
                        // @ts-ignore
                        { content: 'step 1' },
                        // @ts-ignore
                        { content: 'step 2' },
                        // @ts-ignore
                        { content: 'step 3' },
                        // @ts-ignore
                        { content: 'step 4' },
                        // @ts-ignore
                        { content: 'step 5' },
                        // @ts-ignore
                        { content: 'step 6' },
                    ],
                },
            ],
        },
        {
            id: 4,
            coverImage: '',
            description: 'Dobre ciacho 2',
            name: 'Test recipe 4',
            // @ts-ignore
            tags: [tags[8]],
            ingredientSections: [
                {
                    name: 'Ingredient section 1',
                    recipeIngredients: [
                        // @ts-expect-error
                        {
                            ingredient: ingredients[0],
                            quantityFrom: 3,
                            unit: units[0],
                        },
                        // @ts-expect-error
                        {
                            ingredient: ingredients[6],
                            quantityFrom: 2.5,
                            unit: units[4],
                        },
                    ],
                },
                {
                    name: 'Ingredient section 2',
                    recipeIngredients: [
                        // @ts-expect-error
                        {
                            ingredient: ingredients[0],
                            quantityFrom: 3,
                            unit: units[0],
                        },
                        // @ts-expect-error
                        {
                            ingredient: ingredients[6],
                            quantityFrom: 2.5,
                            unit: units[4],
                        },
                    ],
                },
            ],
            sections: [
                {
                    name: 'Section 1',
                    recipeSteps: [
                        // @ts-ignore
                        { content: 'step 1' },
                        // @ts-ignore
                        { content: 'step 2' },
                        // @ts-ignore
                        { content: 'step 3' },
                        // @ts-ignore
                        { content: 'step 4' },
                        // @ts-ignore
                        { content: 'step 5' },
                        // @ts-ignore
                        { content: 'step 6' },
                        // @ts-ignore
                        { content: 'step 7' },
                        // @ts-ignore
                        { content: 'step 8' },
                        // @ts-ignore
                        { content: 'step 9' },
                        // @ts-ignore
                        { content: 'step 10' },
                        // @ts-ignore
                        { content: 'step 11' },
                        // @ts-ignore
                        { content: 'step 12' },
                        // @ts-ignore
                        { content: 'step 13' },
                        // @ts-ignore
                        { content: 'step 14' },
                        // @ts-ignore
                        { content: 'step 15' },
                    ],
                },
                {
                    name: 'Section 2',
                    recipeSteps: [
                        // @ts-ignore
                        { content: 'step 1' },
                        // @ts-ignore
                        { content: 'step 2' },
                        // @ts-ignore
                        { content: 'step 3' },
                        // @ts-ignore
                        { content: 'step 4' },
                        // @ts-ignore
                        { content: 'step 5' },
                        // @ts-ignore
                        { content: 'step 6' },
                    ],
                },
            ],
        },
    ];

    return {
        tags,
        units,
        ingredients,
        recipes,
    };
};

export type MockData = ReturnType<typeof createMockData>;

export class TestDatabaseBuilder {
    private static dataSource: DataSource;
    private database!: Database;

    private shouldIncludeContent = false;
    private shouldDeleteRecipe = false;

    private recipeToDelete?: Recipe;
    private recipeToSkip?: Recipe;
    private mockData?: MockData;

    public static init() {
        if (!TestDatabaseBuilder.dataSource) {
            TestDatabaseBuilder.dataSource = new DataSource({
                type: 'sqlite',
                database: ':memory:',
                driver: sqlite3,
                logging: false,
                dropSchema: true,
                synchronize: true,
                entities: [
                    RecipeStep,
                    Ingredient,
                    IngredientSection,
                    Recipe,
                    RecipeIngredient,
                    RecipeSection,
                    Tag,
                    Unit,
                ],
            });
        }
    }

    private async init() {
        const connection = TestDatabaseBuilder.dataSource.isInitialized
            ? TestDatabaseBuilder.dataSource
            : await TestDatabaseBuilder.dataSource.initialize();

        const dbObject = {
            dataSource: connection,
            connection,
            ingredientRepository: connection.getRepository(Ingredient),
            ingredientSectionRepository: connection.getRepository(IngredientSection),
            recipeRepository: connection.getRepository(Recipe),
            recipeIngredientRepository: connection.getRepository(RecipeIngredient),
            recipeSectionRepository: connection.getRepository(RecipeSection),
            recipeStepRepository: connection.getRepository(RecipeStep),
            tagRepository: connection.getRepository(Tag),
            unitRepository: connection.getRepository(Unit),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transaction: (runner: (entityManager: EntityManager) => Promise<any>) =>
                connection.transaction(runner),
        } as unknown as Database;

        this.database = dbObject;
    }

    withContent(mockData: MockData, { skipRecipe }: { skipRecipe?: Recipe } = {}) {
        this.shouldIncludeContent = true;
        this.recipeToSkip = skipRecipe;
        this.mockData = mockData;

        return this;
    }

    withDeletedRecipe() {
        this.shouldDeleteRecipe = true;
        return this;
    }

    private async deleteRecipe() {
        for (const ingredientSection of this.recipeToDelete?.ingredientSections ?? []) {
            for (const recipeIngredient of ingredientSection.recipeIngredients ?? []) {
                if (recipeIngredient.unit) {
                    const other = await this.database.recipeIngredientRepository.find({
                        where: {
                            unit: recipeIngredient.unit,
                        },
                        relations: ['unit'],
                    });

                    if ((other.length === 1 && other[0].id === recipeIngredient.id) || other.length === 0) {
                        await this.database.unitRepository.softRemove(recipeIngredient.unit);
                    }
                }

                if (recipeIngredient.ingredient) {
                    const other = await this.database.recipeIngredientRepository.find({
                        where: {
                            ingredient: recipeIngredient.ingredient,
                        },
                        relations: ['ingredient'],
                    });

                    if ((other.length === 1 && other[0].id === recipeIngredient.id) || other.length === 0) {
                        await this.database.ingredientRepository.softRemove(recipeIngredient.ingredient);
                    }
                }

                await this.database.recipeIngredientRepository.softRemove(recipeIngredient);
            }

            await this.database.ingredientSectionRepository.softRemove(ingredientSection);
        }

        for (const recipeSection of this.recipeToDelete?.sections ?? []) {
            await this.database.recipeStepRepository.softRemove(recipeSection.recipeSteps ?? []);
            await this.database.recipeSectionRepository.softRemove(recipeSection);
        }

        if (this.recipeToDelete) {
            await this.database.recipeRepository.softRemove(this.recipeToDelete);
        }
    }

    private async addContent() {
        if (!this.mockData) {
            throw new Error('Unrechable');
        }

        [this.recipeToDelete] = this.mockData.recipes;

        await this.database.unitRepository.save(this.mockData.units);
        await this.database.tagRepository.save(this.mockData.tags);
        await this.database.ingredientRepository.save(this.mockData.ingredients);
        await this.database.recipeRepository.save(
            this.mockData.recipes.filter(r => r.id !== this.recipeToSkip?.id),
        );

        // await Promise.all(
        //     recipes.flatMap(recipe =>
        //         recipe.ingredientSections?.map(section =>
        //             this.database.ingredientSectionRepository.save(section),
        //         ),
        //     ),
        // );

        // await Promise.all(
        //     recipes.flatMap(recipe =>
        //         recipe.ingredientSections?.flatMap(section =>
        //             section.recipeIngredients?.map(ri => this.database.ingredientSectionRepository.save(ri)),
        //         ),
        //     ),
        // );

        // await Promise.all(
        //     recipes.flatMap(recipe =>
        //         recipe.sections?.map(section => this.database.recipeSectionRepository.save(section)),
        //     ),
        // );

        // await Promise.all(
        //     recipes.flatMap(recipe =>
        //         recipe.sections?.flatMap(section =>
        //             section.recipeSteps?.map(rs => this.database.recipeStepRepository.save(rs)),
        //         ),
        //     ),
        // );
    }

    async build() {
        await this.init();

        if (this.shouldIncludeContent) {
            await this.addContent();
        }

        if (this.shouldDeleteRecipe) {
            await this.deleteRecipe();
        }

        return this.database;
    }

    public static async cleanup() {
        try {
            await TestDatabaseBuilder.dataSource.query(`
                PRAGMA writable_schema = 1;
                DELETE FROM sqlite_master;
                PRAGMA writable_schema = 0;
                VACUUM;
                PRAGMA integrity_check;
            `);

            await TestDatabaseBuilder.dataSource.destroy();
            // @ts-expect-error uagabuga
            TestDatabaseBuilder.dataSource = undefined;
        } catch (error) {
            throw new Error(`ERROR: Cleaning test database: ${error}`);
        }
    }
}
