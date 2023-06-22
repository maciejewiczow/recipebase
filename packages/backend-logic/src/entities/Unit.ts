import { makeAutoObservable } from 'mobx';
import {
    Column,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import RecipeIngredient from './RecipeIngredient';

@Entity('Unit')
export default class Unit {
    @PrimaryGeneratedColumn()
        id!: number;

    @Column({ type: 'varchar', unique: true })
        name!: string;

    @Column('simple-array')
        plurals!: string[];

    @OneToMany(() => RecipeIngredient, ri => ri.unit, { cascade: true })
        recipeIngredients?: RecipeIngredient[];

    @DeleteDateColumn({ nullable: true })
        deletedAt!: Date | null;

    constructor() {
        makeAutoObservable(this);
    }
}
