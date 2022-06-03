import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
} from 'typeorm/browser';
import IngredientSection from './IngredientSection';
import RecipeSection from './RecipeSection';
import Tag from './Tag';

@Entity('Recipe')
export default class Recipe {
    @PrimaryGeneratedColumn()
        id!: number;

    @Column({ type: 'varchar', length: 2000 })
        name!: string;

    @Column('text')
        description!: string;

    @Column('blob')
        coverImage!: Buffer;

    @ManyToMany(() => Tag, t => t.recipes)
    @JoinTable()
        tags!: Tag[];

    @OneToMany(() => RecipeSection, rs => rs.recipe)
        sections!: RecipeSection[];

    @OneToMany(() => IngredientSection, is => is.recipe)
        ingredientSections!: IngredientSection[];
}
