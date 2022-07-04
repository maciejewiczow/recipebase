import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import Recipe from './Recipe';
import RecipeIngredient from './RecipeIngredient';

@Entity('IngredientSection')
export default class IngredientSection {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 1000, nullable: true })
    name!: string | null;

    @ManyToOne(() => Recipe, r => r.ingredientSections)
    recipe?: Recipe;

    @OneToMany(() => RecipeIngredient, ri => ri.ingredientSection, { cascade: true })
    recipeIngredients?: RecipeIngredient[];
}
