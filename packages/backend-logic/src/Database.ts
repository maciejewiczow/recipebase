import { DataSource, EntityManager, Repository } from 'typeorm';
import { Ingredient } from './entities/Ingredient';
import { IngredientSection } from './entities/IngredientSection';
import { Recipe } from './entities/Recipe';
import { RecipeIngredient } from './entities/RecipeIngredient';
import { RecipeSection } from './entities/RecipeSection';
import { RecipeStep } from './entities/RecipeStep';
import { Tag } from './entities/Tag';
import { Unit } from './entities/Unit';

export class Database {
    private dataSource: DataSource;
    private connection!: DataSource;

    ingredientRepository!: Repository<Ingredient>;
    ingredientSectionRepository!: Repository<IngredientSection>;
    recipeRepository!: Repository<Recipe>;
    recipeIngredientRepository!: Repository<RecipeIngredient>;
    recipeSectionRepository!: Repository<RecipeSection>;
    recipeStepRepository!: Repository<RecipeStep>;
    tagRepository!: Repository<Tag>;
    unitRepository!: Repository<Unit>;

    public static async init(dbFilePath: string, storageDriver?: unknown) {
        const db = new Database(dbFilePath, storageDriver);
        await db.initalize();
        return db;
    }

    private constructor(dbFilePath: string, storageDriver?: unknown) {
        this.dataSource = new DataSource({
            type: 'react-native',
            database: 'recipebase',
            location: 'Documents',
            extra: {
                name: dbFilePath,
            },
            driver: storageDriver,
            logging: ['error', 'query', 'schema'],
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

        this.dataSource.logger.logQueryError = (error, query, params, _) => {
            console.error('query failed: ', query, ' -- PARAMETERS: ', params);
            console.error(
                'Query error: ',
                typeof error === 'object'
                    ? JSON.stringify(error, null, 4)
                    : error,
            );
        };

        const originalLogQuery = this.dataSource.logger.logQuery.bind(
            this.dataSource.logger,
        );
        this.dataSource.logger.logQuery = (query, parameters, qr) => {
            originalLogQuery(
                query,
                // TODO: make prettier leave the parthesis in place
                // prettier-ignore
                parameters?.map(param => (
                    typeof param === 'string' && param.length > 500
                        ? param.slice(0, 500) + '...'
                        : param
                )),
                qr,
            );
        };
    }

    private async initalize() {
        this.connection = await this.dataSource.initialize();

        this.ingredientRepository = this.connection.getRepository(Ingredient);
        this.ingredientSectionRepository =
            this.connection.getRepository(IngredientSection);
        this.recipeRepository = this.connection.getRepository(Recipe);
        this.recipeIngredientRepository =
            this.connection.getRepository(RecipeIngredient);
        this.recipeSectionRepository =
            this.connection.getRepository(RecipeSection);
        this.recipeStepRepository = this.connection.getRepository(RecipeStep);
        this.tagRepository = this.connection.getRepository(Tag);
        this.unitRepository = this.connection.getRepository(Unit);
    }

    transaction<T>(
        runInTransaction: (entityManager: EntityManager) => Promise<T>,
    ): Promise<T> {
        return this.dataSource.transaction(runInTransaction);
    }
}
