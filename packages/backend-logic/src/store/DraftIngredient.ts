import { action, makeAutoObservable } from 'mobx';
import Database from '../Database';
import Ingredient from '../entities/Ingredient';
import RecipeIngredient from '../entities/RecipeIngredient';
import Unit from '../entities/Unit';
import { parseQuantityString } from './recipeUtils';

export class DraftIngredient {
    unitSearchString = '';
    unit = new Unit();
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
        this.unit.name = this.unitSearchString.trim();
    };

    @action setName = (name: string) => {
        this.ingredient.name = name;
    };

    @action setQuantityString = (value: string) => {
        this.quantityString = value;
    };

    set newIngredient(i: Ingredient) {
        this.ingredient = i;
    }

    @action commitSelectedIngredient = () => {
        ({
            quantityFrom: this.recipeIngredient.quantityFrom,
            quantityTo: this.recipeIngredient.quantityTo,
        } = parseQuantityString(this.quantityString));
        this.recipeIngredient.ingredient = this.ingredient;
    };

    @action setUnitName = (name: string) => {
        this.unit.name = name;
    };

    @action setUnit = (u: Unit) => {
        this.unit = u;
    };

    @action commitSelectedUnit = () => {
        this.recipeIngredient.unit = this.unit;
    };

    @action reset = () => {
        this.unitSearchString = '';
        this.unit = new Unit();
        this.ingredient = Ingredient.createWithTemporaryId();
        this.recipeIngredient = RecipeIngredient.createWithTemporaryId();
        this.quantityString = '';
    };

    @action setRecipeIngredient = (ri: RecipeIngredient) => {
        this.recipeIngredient = ri;
        this.ingredient = ri.ingredient ?? Ingredient.createWithTemporaryId();
        this.unit = ri.unit ?? new Unit();
        this.unitSearchString = '';
        this.quantityString =
            ri.quantityFrom +
            (ri.quantityTo !== undefined ? `-${ri.quantityTo}` : '');
    };
}
