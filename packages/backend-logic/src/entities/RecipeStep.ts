import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm/browser';
import RecipeSection from './RecipeSection';

@Entity('RecipeStep')
export default class RecipeStep {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text')
    content!: string;

    @ManyToOne(() => RecipeSection, rs => rs.recipeSteps)
    recipeSection?: RecipeSection;
}
