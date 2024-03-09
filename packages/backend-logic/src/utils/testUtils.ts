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
import { DataSource } from 'typeorm';

export const initalizeTestDatabase = async (): Promise<Database> => {
    const dataSource = new DataSource({
        type: 'sqlite',
        database: ':memory:',
        name: 'memory',
        logging: false,
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

    const connection = await dataSource.initialize();

    const dbObject = {
        dataSource,
        connection,
        ingredientRepository: connection.getRepository(Ingredient),
        ingredientSectionRepository: connection.getRepository(IngredientSection),
        recipeRepository: connection.getRepository(Recipe),
        recipeIngredientRepository: connection.getRepository(RecipeIngredient),
        recipeSectionRepository: connection.getRepository(RecipeSection),
        recipeStepRepository: connection.getRepository(RecipeStep),
        tagRepository: connection.getRepository(Tag),
        unitRepository: connection.getRepository(Unit),
        initalize: () => Promise.resolve(),
    };

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

    await dbObject.unitRepository.save(units);
    await dbObject.tagRepository.save(tags);
    await dbObject.ingredientRepository.save(ingredients);
    await dbObject.recipeRepository.save(recipes);

    await Promise.all(
        recipes.flatMap(recipe => recipe.ingredientSections?.map(section => dbObject.ingredientSectionRepository.save(section)),
        ),
    );

    await Promise.all(
        recipes.flatMap(recipe => recipe.ingredientSections?.flatMap(section => section.recipeIngredients?.map(ri => dbObject.ingredientSectionRepository.save(ri)),
            ),
        ),
    );

    await Promise.all(
        recipes.flatMap(recipe => recipe.sections?.map(section => dbObject.recipeSectionRepository.save(section)),
        ),
    );

    await Promise.all(
        recipes.flatMap(recipe => recipe.sections?.flatMap(section => section.recipeSteps?.map(rs => dbObject.recipeStepRepository.save(rs)),
            ),
        ),
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return dbObject;
};
