import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm/browser';
import RecipeIngredient from './RecipeIngredient';

@Entity('Unit')
export default class Unit {
    @PrimaryGeneratedColumn()
        id!: number;

    @Column({ type: 'varchar' })
        name!: string;

    @Column('simple-array')
        plurals!: string[];

    @OneToMany(() => RecipeIngredient, ri => ri.unit)
        recipeIngredients?: RecipeIngredient[];
}
