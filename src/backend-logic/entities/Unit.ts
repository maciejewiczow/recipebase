import { makeAutoObservable } from 'mobx';
import { Column, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeIngredient } from './RecipeIngredient';

@Entity('Unit')
export class Unit {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', unique: true })
    name!: string;

    @OneToMany(() => RecipeIngredient, ri => ri.unit, { cascade: true })
    @JoinColumn()
    recipeIngredients?: RecipeIngredient[];

    @DeleteDateColumn({ nullable: true })
    deletedAt!: Date | null;

    constructor() {
        makeAutoObservable(this);
    }

    static createWithTemporaryId() {
        const newUnit = new Unit();
        newUnit.id = Math.random();
        return newUnit;
    }
}
