import { flow, makeAutoObservable } from 'mobx';
import Database from '../Database';
import Ingredient from '../entities/Ingredient';
import { ILike } from 'typeorm';
import { yieldResult } from '../utils/yieldResult';

export class Ingredients {
    isFetchingIngredients = false;
    ingredients: Ingredient[] = [];

    constructor(private database: Database) {
        makeAutoObservable(this);
    }

    fetchIngredients = flow(function* (this: Ingredients, searchText: string) {
        const term = searchText.trim();

        if (!term) {
            this.ingredients = [];
            return;
        }

        this.isFetchingIngredients = true;

        const ingredients = yield* yieldResult(() => this.database.ingredientRepository?.find({
            where: {
                name: ILike(`%${term}%`),
            },
        }))();

        console.log(ingredients?.map(i => i.name));

        if (ingredients)
            this.ingredients = ingredients;

        this.isFetchingIngredients = false;
    });
}
