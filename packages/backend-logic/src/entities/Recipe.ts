import { makeAutoObservable } from 'mobx';
import {
    Column,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IngredientSection } from './IngredientSection';
import { RecipeSection } from './RecipeSection';
import { Tag } from './Tag';

@Entity('Recipe')
export class Recipe {
    @PrimaryGeneratedColumn()
    id!: number;

    @Index({ fulltext: true })
    @Column({ type: 'varchar', length: 2000 })
    name!: string;

    @Index({ fulltext: true })
    @Column('text')
    description!: string;

    @Column({ type: 'varchar', length: 1e3 })
    coverImage: string | undefined;

    @Column({ type: 'varchar', length: 500, nullable: true })
    source?: string;

    @ManyToMany(() => Tag, t => t.recipes, { cascade: true })
    @JoinTable()
    tags?: Tag[];

    @OneToMany(() => RecipeSection, rs => rs.recipe, { cascade: true })
    @JoinColumn()
    sections?: RecipeSection[];

    @OneToMany(() => IngredientSection, is => is.recipe, { cascade: true })
    @JoinColumn()
    ingredientSections?: IngredientSection[];

    @DeleteDateColumn({ nullable: true })
    deletedAt!: Date | null;

    constructor() {
        makeAutoObservable(this);
    }

    static createEmpty() {
        const recipe = new Recipe();

        const is = IngredientSection.createWithTemporaryId();
        is.recipeIngredients = [];

        recipe.ingredientSections = [is];

        const section = RecipeSection.createWithTemporaryId();
        section.recipeSteps = [];

        recipe.sections = [section];

        return recipe;
    }
}
