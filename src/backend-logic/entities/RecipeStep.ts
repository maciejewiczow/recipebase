import { makeAutoObservable } from 'mobx';
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { RecipeIngredient } from './RecipeIngredient';
import { RecipeSection } from './RecipeSection';

@Entity('RecipeStep')
export class RecipeStep {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text')
    content!: string;

    @Column({ nullable: true })
    photo: string | undefined;

    @ManyToOne(() => RecipeSection, rs => rs.recipeSteps)
    recipeSection?: RecipeSection;

    @DeleteDateColumn({ nullable: true })
    deletedAt!: Date | null;

    @OneToMany(() => RecipeIngredient, ri => ri.referencingRecipeStep, { cascade: true })
    @JoinColumn()
    referencedIngredients?: RecipeIngredient[];

    constructor() {
        makeAutoObservable(this);
    }

    static createWithTemporaryId() {
        const newStep = new RecipeStep();
        newStep.id = Math.random();
        return newStep;
    }
}
