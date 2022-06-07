import { makeAutoObservable } from 'mobx';
import { ILike } from 'typeorm/browser';
import { Database, Recipe } from 'backend-logic';
import { TagWithSelectedState } from './Tags';

export class Recipes {
    isFetchingRecipes = false;
    recipes: Recipe[] = [];
    filteredRecipes: Recipe[] = [];
    currentRecipe?: Recipe;

    constructor(private database: Database) {
        makeAutoObservable(this);
    }

    *fetchRecipes(searchText: string, selectedTags: TagWithSelectedState[]) {
        this.isFetchingRecipes = true;
        const escapedText = searchText.trim().replace('%', '\\%').replace('_', '\\_');

        const terms = escapedText.match(/(?:[^\s"]+|"[^"]*")+/g);

        this.recipes = yield this.database.recipeRepository
            ?.find({
                where: escapedText.length > 0 ? (
                    terms?.flatMap(term => ([
                        { name: ILike(`%${term}%`) },
                        { description: ILike(`%${term}%`) },
                    ]))
                ) : undefined,
                relations: ['tags'],
            }) || [];

        this.filterRecipes(selectedTags);

        this.isFetchingRecipes = false;
    }

    // eslint-disable-next-line require-yield
    *filterRecipes(selectedTags: TagWithSelectedState[]) {
        this.filteredRecipes = this.recipes.filter(rc => selectedTags
            ?.every(stag => rc.tags?.find(tag => stag.tag.id === tag.id))
        );
    }

    *fetchRecipeById(id: Recipe['id']) {
        this.currentRecipe = yield this.database.recipeRepository?.findOne({
            where: { id },
            relations: [
                'ingredientSections',
                'ingredientSections.recipeIngredients',
                'ingredientSections.recipeIngredients.unit',
                'sections',
                'sections.recipeSteps',
                'tags',
            ],
        });
    }
}