import { DataSource, Repository } from 'typeorm';
import Ingredient from './entities/Ingredient';
import IngredientSection from './entities/IngredientSection';
import Recipe from './entities/Recipe';
import RecipeIngredient from './entities/RecipeIngredient';
import RecipeSection from './entities/RecipeSection';
import RecipeStep from './entities/RecipeStep';
import Tag from './entities/Tag';
import Unit from './entities/Unit';

export default class Database {
    private dataSource: DataSource;
    private connection?: DataSource;

    ingredientRepository?: Repository<Ingredient>;
    ingredientSectionRepository?: Repository<IngredientSection>;
    recipeRepository?: Repository<Recipe>;
    recipeIngredientRepository?: Repository<RecipeIngredient>;
    recipeSectionRepository?: Repository<RecipeSection>;
    recipeStepRepository?: Repository<RecipeStep>;
    tagRepository?: Repository<Tag>;
    unitRepository?: Repository<Unit>;

    constructor(dbFilePath: string, storageDriver?: any) {
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
    }

    async initalize() {
        this.connection = await this.dataSource.initialize();

        this.ingredientRepository = this.connection.getRepository(Ingredient);
        this.ingredientSectionRepository = this.connection.getRepository(IngredientSection);
        this.recipeRepository = this.connection.getRepository(Recipe);
        this.recipeIngredientRepository = this.connection.getRepository(RecipeIngredient);
        this.recipeSectionRepository = this.connection.getRepository(RecipeSection);
        this.recipeStepRepository = this.connection.getRepository(RecipeStep);
        this.tagRepository = this.connection.getRepository(Tag);
        this.unitRepository = this.connection.getRepository(Unit);
    }
}
