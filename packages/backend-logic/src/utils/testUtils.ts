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
import { DataSource, EntityManager } from 'typeorm';

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

const units: Partial<Unit>[] = [
    { name: 'unit 1' },
    { name: 'unit 2' },
    { name: 'unit 3' },
    { name: 'unit 4' },
    { name: 'unit 5' },
    { name: 'unit 6' },
    { name: 'unit 7' },
    { name: 'unit 8' },
    { name: 'unit 9' },
    { name: 'unit 10' },
    { name: 'unit 11' },
];

const ingredients: Partial<Ingredient>[] = [
    { name: 'ingredient 1' },
    { name: 'ingredient 2' },
    { name: 'ingredient 3' },
    { name: 'ingredient 4' },
    { name: 'ingredient 5' },
    { name: 'ingredient 6' },
    { name: 'ingredient 7' },
    { name: 'ingredient 8' },
    { name: 'ingredient 9' },
    { name: 'ingredient 10' },
    { name: 'ingredient 11' },
    { name: 'ingredient 12' },
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
                    {
                        // @ts-ignore
                        ingredient: ingredients[0],
                        quantityFrom: 3,
                        // @ts-ignore
                        unit: units[0],
                    },
                    {
                        // @ts-ignore
                        ingredient: ingredients[6],
                        quantityFrom: 2.5,
                        // @ts-ignore
                        unit: units[4],
                    },
                    {
                        // @ts-ignore
                        ingredient: ingredients[2],
                        quantityFrom: 3,
                        quantityTo: 5,
                        // @ts-ignore
                        unit: units[2],
                    },
                ],
            },
            {
                name: 'Ingredient section 2',
                recipeIngredients: [
                    {
                        // @ts-ignore
                        ingredient: ingredients[1],
                        quantityFrom: 3,
                        // @ts-ignore
                        unit: units[1],
                    },
                    {
                        // @ts-ignore
                        ingredient: ingredients[5],
                        quantityFrom: 400,
                        // @ts-ignore
                        unit: units[11],
                    },
                    {
                        // @ts-ignore
                        ingredient: ingredients[8],
                        quantityFrom: 40,
                        quantityTo: 60,
                        // @ts-ignore
                        unit: units[9],
                    },
                    {
                        // @ts-ignore
                        ingredient: ingredients[10],
                        quantityFrom: 1,
                        // @ts-ignore
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
                    {
                        // @ts-ignore
                        ingredient: ingredients[0],
                        quantityFrom: 3,
                        // @ts-ignore
                        unit: units[0],
                    },
                    {
                        // @ts-ignore
                        ingredient: ingredients[6],
                        quantityFrom: 2.5,
                        // @ts-ignore
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
                    {
                        // @ts-ignore
                        ingredient: ingredients[0],
                        quantityFrom: 3,
                        // @ts-ignore
                        unit: units[0],
                    },
                    {
                        // @ts-ignore
                        ingredient: ingredients[6],
                        quantityFrom: 2.5,
                        // @ts-ignore
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
                    {
                        // @ts-ignore
                        ingredient: ingredients[0],
                        quantityFrom: 3,
                        // @ts-ignore
                        unit: units[0],
                    },
                    {
                        // @ts-ignore
                        ingredient: ingredients[6],
                        quantityFrom: 2.5,
                        // @ts-ignore
                        unit: units[4],
                    },
                ],
            },
            {
                name: 'Ingredient section 2',
                recipeIngredients: [
                    {
                        // @ts-ignore
                        ingredient: ingredients[0],
                        quantityFrom: 3,
                        // @ts-ignore
                        unit: units[0],
                    },
                    {
                        // @ts-ignore
                        ingredient: ingredients[6],
                        quantityFrom: 2.5,
                        // @ts-ignore
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

export const mockData = {
    tags,
    units,
    ingredients,
    recipes,
};

export class TestDatabaseBuilder {
    private dataSource: DataSource;
    private database!: Database;

    private shouldIncludeContent = false;
    private shouldDeleteRecipe = false;

    private recipeToDelete?: Recipe;

    constructor() {
        this.dataSource = new DataSource({
            type: 'sqlite',
            database: ':memory:',
            name: Math.random().toString().split('.')[1],
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

    private async init() {
        const connection = await this.dataSource.initialize();

        const dbObject = {
            dataSource: this.dataSource,
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

    withContent() {
        this.shouldIncludeContent = true;
        return this;
    }

    withDeletedRecipes() {
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
        [this.recipeToDelete] = recipes;

        await this.database.unitRepository.save(units);
        await this.database.tagRepository.save(tags);
        await this.database.ingredientRepository.save(ingredients);
        await this.database.recipeRepository.save(recipes);

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

        return {
            database: this.database,
            cleanup: async () => {
                await this.dataSource.dropDatabase();
                if (this.dataSource.isInitialized) {
                    await this.dataSource.destroy();
                }
            },
        };
    }
}
