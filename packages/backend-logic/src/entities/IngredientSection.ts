import { makeAutoObservable } from 'mobx';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    DeleteDateColumn,
    JoinColumn,
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
    @JoinColumn()
    recipeIngredients?: RecipeIngredient[];

    @DeleteDateColumn({ nullable: true })
    deletedAt!: Date | null;

    constructor() {
        makeAutoObservable(this);
    }

    static createWithTemporaryId() {
        const newSection = new IngredientSection();
        newSection.id = Math.random();
        return newSection;
    }
}
