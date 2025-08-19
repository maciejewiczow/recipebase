import { makeAutoObservable } from 'mobx';
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { parseQuantityString } from '../store/recipeUtils';
import { Ingredient } from './Ingredient';
import { IngredientSection } from './IngredientSection';
import { RecipeStep } from './RecipeStep';
import { Unit } from './Unit';

@Entity('RecipeIngredient')
export class RecipeIngredient {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'double', nullable: true })
    quantityFrom?: number;

    @Column({ type: 'double', nullable: true })
    quantityTo?: number;

    @ManyToOne(() => IngredientSection, is => is.recipeIngredients)
    ingredientSection?: IngredientSection;

    @ManyToOne(() => Ingredient, ingr => ingr.recipeIngredients)
    ingredient?: Ingredient;

    @ManyToOne(() => Unit, u => u.recipeIngredients)
    unit?: Unit;

    @ManyToOne(() => RecipeStep, step => step.referencedIngredients)
    referencingRecipeStep?: RecipeStep;

    @DeleteDateColumn({ nullable: true })
    deletedAt!: Date | null;

    constructor() {
        makeAutoObservable(this);
        this.quantityFrom = 0;
    }

    static createWithTemporaryId() {
        const newIngr = Ingredient.createWithTemporaryId();

        const newRecipeIngr = new RecipeIngredient();
        newRecipeIngr.id = Math.random();

        newRecipeIngr.ingredient = newIngr;

        return newRecipeIngr;
    }

    static createFromApiData(ingredient: Ingredient, unit: Unit | undefined, quantity: string | null) {
        const ri = RecipeIngredient.createWithTemporaryId();

        ri.unit = unit;
        ri.ingredient = ingredient;

        if (quantity) {
            const [quantityFrom, quantityTo] = parseQuantityString(quantity);

            ri.quantityFrom = quantityFrom;
            ri.quantityTo = quantityTo;
        } else {
            ri.quantityFrom = undefined;
        }

        if (ri.quantityFrom !== undefined && isNaN(ri.quantityFrom)) {
            ri.unit = undefined;
            ri.quantityFrom = undefined;
        }

        return ri;
    }
}
