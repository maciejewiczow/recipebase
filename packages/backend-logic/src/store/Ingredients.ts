import { flow, makeAutoObservable } from 'mobx';
import { ILike } from 'typeorm';
import { Database } from '../Database';
import { Ingredient } from '../entities/Ingredient';
import { yieldResult } from '../utils/yieldResult';

export class Ingredients {
    isFetchingIngredients = false;
    ingredients: Ingredient[] = [];

    constructor(private database: Database) {
        makeAutoObservable(this);
    }

    fetchIngredients = flow(function* (this: Ingredients, searchText: string) {
        const term = searchText.trim();

        this.isFetchingIngredients = true;

        // prettier-ignore
        this.ingredients = yield* yieldResult(() => (
            this.database.ingredientRepository.find(term ? {
                where: {
                    name: ILike(`%${term}%`),
                },
            } : undefined)
        ))();

        this.isFetchingIngredients = false;
    });
}
