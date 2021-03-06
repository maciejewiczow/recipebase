import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import RecipeIngredient from './RecipeIngredient';

@Entity('Ingredient')
export default class Ingredient {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 1000 })
    name!: string;

    @OneToMany(() => RecipeIngredient, ri => ri.ingredient, { cascade: true })
    recipeIngredients?: RecipeIngredient[];
}
