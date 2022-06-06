import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm/browser';
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

    @OneToMany(() => RecipeStep, rs => rs.recipeSection)
        recipeSteps?: RecipeStep[];
}
