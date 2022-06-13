import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    Index,
} from 'typeorm/browser';
import IngredientSection from './IngredientSection';
import RecipeSection from './RecipeSection';
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

    @Column({
        type: 'varchar',
        length: 1e3,
    })
        coverImage!: string;

    @Column({
        type:'varchar',
        length: 500,
        nullable: true,
    })
        sourceUrl?: string;

    @ManyToMany(() => Tag, t => t.recipes)
    @JoinTable()
        tags?: Tag[];

    @OneToMany(() => RecipeSection, rs => rs.recipe)
        sections?: RecipeSection[];

    @OneToMany(() => IngredientSection, is => is.recipe)
        ingredientSections?: IngredientSection[];
}
