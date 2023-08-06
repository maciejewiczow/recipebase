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
import Recipe from './Recipe';
import RecipeStep from './RecipeStep';

@Entity('RecipeSection')
export default class RecipeSection {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', nullable: true, length: 1000 })
    name!: string | null;

    @ManyToOne(() => Recipe, r => r.sections)
    recipe?: Recipe;

    @OneToMany(() => RecipeStep, rs => rs.recipeSection, { cascade: true })
    @JoinColumn()
    recipeSteps?: RecipeStep[];

    @DeleteDateColumn({ nullable: true })
    deletedAt!: Date | null;

    constructor() {
        makeAutoObservable(this);
    }

    static createWithTemporaryId() {
        const newSection = new RecipeSection();
        newSection.id = Math.random();
        return newSection;
    }
}
