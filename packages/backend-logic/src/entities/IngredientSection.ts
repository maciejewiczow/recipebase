import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm/browser';
import Recipe from './Recipe';
import RecipeIngredient from './RecipeIngredient';

@Entity('IngredientSection')
export default class IngredientSection {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 1000 })
    name!: string;

    @ManyToOne(() => Recipe, r => r.ingredientSections)
    recipe?: Recipe;

    @OneToMany(() => RecipeIngredient, ri => ri.ingredientSection)
    recipeIngredients?: RecipeIngredient[];
}
