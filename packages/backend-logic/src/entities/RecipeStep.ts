import { makeAutoObservable } from 'mobx';
import {
    Column,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import RecipeSection from './RecipeSection';

@Entity('RecipeStep')
export default class RecipeStep {
    @PrimaryGeneratedColumn()
        id!: number;

    @Column('text')
        content!: string;

    @ManyToOne(() => RecipeSection, rs => rs.recipeSteps)
        recipeSection?: RecipeSection;

    @DeleteDateColumn({ nullable: true })
        deletedAt!: Date | null;

    constructor() {
        makeAutoObservable(this);
    }

    static createWithTemporaryId() {
        const newStep = new RecipeStep();
        newStep.id = Math.random();
        return newStep;
    }
}
