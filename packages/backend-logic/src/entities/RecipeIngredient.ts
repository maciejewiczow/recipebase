import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Ingredient from './Ingredient';
import IngredientSection from './IngredientSection';
import Unit from './Unit';

@Entity('RecipeIngredient')
export default class RecipeIngredient {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type:'double' })
    quantityFrom!: number;

    @Column({ type:'double', nullable: true })
    quantityTo?: number;

    @ManyToOne(() => IngredientSection, is => is.recipeIngredients)
    ingredientSection?: IngredientSection;

    @ManyToOne(() => Ingredient, ingr => ingr.recipeIngredients)
    ingredient?: Ingredient;

    @ManyToOne(() => Unit, u => u.recipeIngredients)
    unit?: Unit;
}
