import { makeAutoObservable } from 'mobx';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    Index,
    DeleteDateColumn,
} from 'typeorm';
import IngredientSection from './IngredientSection';
import RecipeIngredient from './RecipeIngredient';
import RecipeSection from './RecipeSection';
import RecipeStep from './RecipeStep';
import Tag from './Tag';

@Entity('Recipe')
export default class Recipe {
    @PrimaryGeneratedColumn()
    id!: number;

    @Index({ fulltext: true })
    @Column({ type: 'varchar', length: 2000 })
    name!: string;

    @Index({ fulltext: true })
    @Column('text')
    description!: string;

    @Column({ type: 'varchar', length: 1e3 })
    coverImage!: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    sourceUrl?: string;

    @ManyToMany(() => Tag, t => t.recipes)
    @JoinTable()
    tags?: Tag[];

    @OneToMany(() => RecipeSection, rs => rs.recipe, { cascade: true })
    sections?: RecipeSection[];

    @OneToMany(() => IngredientSection, is => is.recipe, { cascade: true })
    ingredientSections?: IngredientSection[];

    @DeleteDateColumn({ nullable: true })
    deletedAt!: Date | null;

    constructor() {
        makeAutoObservable(this);
    }

    static createEmpty() {
        const recipe = new Recipe();

        const ri = RecipeIngredient.createWithTemporaryId();

        const is = IngredientSection.createWithTemporaryId();
        is.recipeIngredients = [ri];

        recipe.ingredientSections = [is];

        const step = RecipeStep.createWithTemporaryId();

        const section = RecipeSection.createWithTemporaryId();
        section.recipeSteps = [step];

        recipe.sections = [section];

        return recipe;
    }
}
