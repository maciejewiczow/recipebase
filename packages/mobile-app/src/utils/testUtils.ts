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

jest.mock('react-native-sqlite-storage');

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

    const tags: Tag[] = [
        { id: 0, name: 'tag 1' },
        { id: 0, name: 'tag 2' },
        { id: 0, name: 'tag 3' },
        { id: 0, name: 'tag 4' },
        { id: 0, name: 'tag 5' },
        { id: 0, name: 'tag 6' },
        { id: 0, name: 'tag 7' },
        { id: 0, name: 'tag 8' },
        { id: 0, name: 'tag 9' },
        { id: 0, name: 'tag 10' },
        { id: 0, name: 'tag 11' },
        { id: 0, name: 'tag 12' },
        { id: 0, name: 'tag 13' },
    ];

    const units: Unit[] = [
        { id: 0, name: 'unit 1', plurals: [] },
        { id: 0, name: 'unit 2', plurals: [] },
        { id: 0, name: 'unit 3', plurals: [] },
        { id: 0, name: 'unit 4', plurals: [] },
        { id: 0, name: 'unit 5', plurals: [] },
        { id: 0, name: 'unit 6', plurals: [] },
        { id: 0, name: 'unit 7', plurals: [] },
        { id: 0, name: 'unit 8', plurals: [] },
        { id: 0, name: 'unit 9', plurals: [] },
        { id: 0, name: 'unit 10', plurals: [] },
        { id: 0, name: 'unit 11', plurals: [] },
    ];

    const ingredients: Ingredient[] = [
        { id: 0, name: 'ingredient 1' },
        { id: 0, name: 'ingredient 2' },
        { id: 0, name: 'ingredient 3' },
        { id: 0, name: 'ingredient 4' },
        { id: 0, name: 'ingredient 5' },
        { id: 0, name: 'ingredient 6' },
        { id: 0, name: 'ingredient 7' },
        { id: 0, name: 'ingredient 8' },
        { id: 0, name: 'ingredient 9' },
        { id: 0, name: 'ingredient 10' },
        { id: 0, name: 'ingredient 11' },
        { id: 0, name: 'ingredient 12' },
        { id: 0, name: 'ingredient 13' },
    ];

    const recipes: Recipe[] = [
        {
            id: 0,
            coverImage : '',
            description : 'Lorem ipsum test test test',
            name : 'Test recipe 1',
            tags: [
                tags[0],
                tags[1],
                tags[2],
            ],
            ingredientSections: [
                {
                    id: 0,
                    name: 'Ingredient section 1',
                    recipeIngredients: [
                        {
                            id: 0,
                            ingredient: ingredients[0],
                            quantityFrom: 3,
                            unit: units[0],
                        },
                        {
                            id: 0,
                            ingredient: ingredients[6],
                            quantityFrom: 2.5,
                            unit: units[4],
                        },
                        {
                            id: 0,
                            ingredient: ingredients[2],
                            quantityFrom: 3,
                            quantityTo: 5,
                            unit: units[2],
                        },
                    ],
                },
                {
                    id: 0,
                    name: 'Ingredient section 2',
                    recipeIngredients: [
                        {
                            id: 0,
                            ingredient: ingredients[1],
                            quantityFrom: 3,
                            unit: units[1],
                        },
                        {
                            id: 0,
                            ingredient: ingredients[5],
                            quantityFrom: 400,
                            unit: units[11],
                        },
                        {
                            id: 0,
                            ingredient: ingredients[8],
                            quantityFrom: 40,
                            quantityTo: 60,
                            unit: units[9],
                        },
                        {
                            id: 0,
                            ingredient: ingredients[10],
                            quantityFrom: 1,
                            unit: units[2],
                        },
                    ],
                },
            ],
            sections: [
                {
                    id: 0,
                    name: null,
                    recipeSteps: [
                        { id: 0, content: 'step 1' },
                        { id: 0, content: 'step 2' },
                        { id: 0, content: 'step 3' },
                        { id: 0, content: 'step 4' },
                        { id: 0, content: 'step 5' },
                    ],
                },
            ],
        },
        {
            id: 0,
            coverImage : '',
            description : 'Bardzo przekonujący opis 2',
            name : 'Test recipe 2',
            tags: [
                tags[2],
                tags[5],
                tags[7],
                tags[8],
            ],
            ingredientSections: [
                {
                    id: 0,
                    name: null,
                    recipeIngredients: [
                        {
                            id: 0,
                            ingredient: ingredients[0],
                            quantityFrom: 3,
                            unit: units[0],
                        },
                        {
                            id: 0,
                            ingredient: ingredients[6],
                            quantityFrom: 2.5,
                            unit: units[4],
                        },
                    ],
                },
            ],
            sections: [
                {
                    id: 0,
                    name: null,
                    recipeSteps: [
                        { id: 0, content: 'step 1' },
                        { id: 0, content: 'step 2' },
                        { id: 0, content: 'step 3' },
                        { id: 0, content: 'step 4' },
                        { id: 0, content: 'step 5' },
                        { id: 0, content: 'step 6' },
                        { id: 0, content: 'step 7' },
                        { id: 0, content: 'step 8' },
                        { id: 0, content: 'step 9' },
                    ],
                },
            ],
        },
        {
            id: 0,
            coverImage : '',
            description : 'Dobre ciacho',
            name : 'Test recipe 3',
            tags: [
                tags[2],
                tags[1],
                tags[10],
                tags[8],
                tags[11],
            ],
            ingredientSections: [
                {
                    id: 0,
                    name: null,
                    recipeIngredients: [
                        {
                            id: 0,
                            ingredient: ingredients[0],
                            quantityFrom: 3,
                            unit: units[0],
                        },
                        {
                            id: 0,
                            ingredient: ingredients[6],
                            quantityFrom: 2.5,
                            unit: units[4],
                        },
                    ],
                },
            ],
            sections: [
                {
                    id: 0,
                    name: 'Section 1',
                    recipeSteps: [
                        { id: 0, content: 'step 1' },
                        { id: 0, content: 'step 2' },
                        { id: 0, content: 'step 3' },
                        { id: 0, content: 'step 4' },
                        { id: 0, content: 'step 5' },
                        { id: 0, content: 'step 6' },
                        { id: 0, content: 'step 7' },
                        { id: 0, content: 'step 8' },
                        { id: 0, content: 'step 9' },
                        { id: 0, content: 'step 10' },
                        { id: 0, content: 'step 11' },
                        { id: 0, content: 'step 12' },
                        { id: 0, content: 'step 13' },
                        { id: 0, content: 'step 14' },
                        { id: 0, content: 'step 15' },
                    ],
                },
                {
                    id: 0,
                    name: 'Section 2',
                    recipeSteps: [
                        { id: 0, content: 'step 1' },
                        { id: 0, content: 'step 2' },
                        { id: 0, content: 'step 3' },
                        { id: 0, content: 'step 4' },
                        { id: 0, content: 'step 5' },
                        { id: 0, content: 'step 6' },
                    ],
                },
            ],
        },
        {
            id: 0,
            coverImage : '',
            description : 'Dobre ciacho 2',
            name : 'Test recipe 4',
            tags: [tags[8]],
            ingredientSections: [
                {
                    id: 0,
                    name: 'Ingredient section 1',
                    recipeIngredients: [
                        {
                            id: 0,
                            ingredient: ingredients[0],
                            quantityFrom: 3,
                            unit: units[0],
                        },
                        {
                            id: 0,
                            ingredient: ingredients[6],
                            quantityFrom: 2.5,
                            unit: units[4],
                        },
                    ],
                },
                {
                    id: 0,
                    name: 'Ingredient section 2',
                    recipeIngredients: [
                        {
                            id: 0,
                            ingredient: ingredients[0],
                            quantityFrom: 3,
                            unit: units[0],
                        },
                        {
                            id: 0,
                            ingredient: ingredients[6],
                            quantityFrom: 2.5,
                            unit: units[4],
                        },
                    ],
                },
            ],
            sections: [
                {
                    id: 0,
                    name: 'Section 1',
                    recipeSteps: [
                        { id: 0, content: 'step 1' },
                        { id: 0, content: 'step 2' },
                        { id: 0, content: 'step 3' },
                        { id: 0, content: 'step 4' },
                        { id: 0, content: 'step 5' },
                        { id: 0, content: 'step 6' },
                        { id: 0, content: 'step 7' },
                        { id: 0, content: 'step 8' },
                        { id: 0, content: 'step 9' },
                        { id: 0, content: 'step 10' },
                        { id: 0, content: 'step 11' },
                        { id: 0, content: 'step 12' },
                        { id: 0, content: 'step 13' },
                        { id: 0, content: 'step 14' },
                        { id: 0, content: 'step 15' },
                    ],
                },
                {
                    id: 0,
                    name: 'Section 2',
                    recipeSteps: [
                        { id: 0, content: 'step 1' },
                        { id: 0, content: 'step 2' },
                        { id: 0, content: 'step 3' },
                        { id: 0, content: 'step 4' },
                        { id: 0, content: 'step 5' },
                        { id: 0, content: 'step 6' },
                    ],
                },
            ],
        },
    ];

    await dbObject.unitRepository.save(units);
    await dbObject.tagRepository.save(tags);
    await dbObject.recipeRepository.save(recipes);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return dbObject;
};
