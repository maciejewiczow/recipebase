import { makeAutoObservable } from 'mobx';
import {
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { RecipeIngredient } from './RecipeIngredient';

@Entity('Unit')
export class Unit {
    @PrimaryColumn({ type: 'varchar' })
    name!: string;

    @OneToMany(() => RecipeIngredient, ri => ri.unit, { cascade: true })
    @JoinColumn()
    recipeIngredients?: RecipeIngredient[];

    @DeleteDateColumn({ nullable: true })
    deletedAt!: Date | null;

    constructor() {
        makeAutoObservable(this);
    }
}
