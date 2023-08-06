import { makeAutoObservable } from 'mobx';
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import RecipeIngredient from './RecipeIngredient';

@Entity('Ingredient')
export default class Ingredient {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 1000 })
    name!: string;

    @OneToMany(() => RecipeIngredient, ri => ri.ingredient, { cascade: true })
    @JoinColumn()
    recipeIngredients?: RecipeIngredient[];

    @DeleteDateColumn({ nullable: true })
    deletedAt!: Date | null;

    constructor() {
        makeAutoObservable(this);
    }

    static createWithTemporaryId() {
        const newIngr = new Ingredient();
        newIngr.id = Math.random();
        return newIngr;
    }
}
