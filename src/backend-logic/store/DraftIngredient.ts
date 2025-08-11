import { action, makeAutoObservable } from 'mobx';
import { Database } from '../Database';
import { Ingredient } from '../entities/Ingredient';
import { RecipeIngredient } from '../entities/RecipeIngredient';
import { Unit } from '../entities/Unit';
import { isTemporaryId } from '../utils/isTemporaryId';
import { parseQuantityString } from './recipeUtils';

export class DraftIngredient {
    unitSearchString = '';
    unit: Unit | undefined = Unit.createWithTemporaryId();
    ingredient = Ingredient.createWithTemporaryId();
    recipeIngredient = RecipeIngredient.createWithTemporaryId();
    quantityString = '';

    constructor(private database: Database) {
        makeAutoObservable(this);
    }

    @action setUnitSearchString = (s: string) => {
        this.unitSearchString = s;
    };

    @action createCustomUnit = () => {
        this.unit = Unit.createWithTemporaryId();
        this.unit.name = this.unitSearchString.trim();
    };

    @action setName = (name: string, shouldCopy: boolean) => {
        if (isTemporaryId(this.ingredient.id) && !shouldCopy) {
            this.ingredient.name = name;
        } else {
            const i = Ingredient.createWithTemporaryId();

            i.name = name;

            this.ingredient = i;
        }
    };

    @action setQuantityString = (value: string) => {
        this.quantityString = value;
    };

    set newIngredient(i: Ingredient) {
        this.ingredient = i;
    }

    @action commitSelectedIngredient = () => {
        ({ quantityFrom: this.recipeIngredient.quantityFrom, quantityTo: this.recipeIngredient.quantityTo } =
            parseQuantityString(this.quantityString));
        this.recipeIngredient.ingredient = this.ingredient;
    };

    @action setUnitName = (name: string) => {
        if (this.unit) {
            this.unit.name = name;
        }
    };

    @action setUnit = (u: Unit | undefined) => {
        this.unit = u;
    };

    @action commitSelectedUnit = () => {
        this.recipeIngredient.unit = this.unit;
    };

    @action reset = () => {
        this.unitSearchString = '';
        this.unit = Unit.createWithTemporaryId();
        this.ingredient = Ingredient.createWithTemporaryId();
        this.recipeIngredient = RecipeIngredient.createWithTemporaryId();
        this.quantityString = '';
    };

    @action setRecipeIngredient = (ri: RecipeIngredient) => {
        this.recipeIngredient = ri;
        this.ingredient = ri.ingredient ?? Ingredient.createWithTemporaryId();
        this.unit = ri.unit ?? Unit.createWithTemporaryId();
        this.unitSearchString = '';

        if (ri.quantityFrom) {
            this.quantityString = ri.quantityFrom + (ri.quantityTo !== undefined ? `-${ri.quantityTo}` : '');
        } else {
            this.quantityString = '';
        }
    };
}
