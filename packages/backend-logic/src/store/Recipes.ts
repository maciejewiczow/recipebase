import { action, computed, flow, makeAutoObservable } from 'mobx';
import { ILike } from 'typeorm';
import { Database, Recipe } from 'backend-logic';
import { TagWithSelectedState } from './Tags';
import { yieldResult } from '../utils/yieldResult';

export class Recipes {
    isFetchingRecipes = false;
    recipes: Recipe[] = [];

    constructor(private database: Database) {
        makeAutoObservable(this);
    }

    fetchRecipes = flow(function* (this: Recipes, searchText: string) {
        this.isFetchingRecipes = true;

        const escapedText = searchText
            .trim()
            .replace(/%/g, '\\%')
            .replace(/_/g, '\\_');

        const matches = escapedText.match(/(?:[^\s"]+|"[^"]*")+/g);

        const terms = matches?.map(term => (term.startsWith('"') && term.endsWith('"') ? term.slice(1, -1) : term)) || [];

        this.recipes = yield* yieldResult(() => (
            this.database.recipeRepository
                .find({
                    where: escapedText.length > 0 ? (
                        terms?.flatMap(term => ([
                            { name: ILike(`%${term}%`) },
                            { description: ILike(`%${term}%`) },
                        ]))
                    ) : undefined,
                    relations: ['tags'],
                }) || [])
        )();

        this.isFetchingRecipes = false;
    });

    @computed filterRecipesByTags = (selectedTags: TagWithSelectedState[]) => (
        this.recipes.filter(rc => selectedTags
            ?.every(selectedTag => rc.tags
                ?.find(tag => selectedTag.tag.id === tag.id)
            )
        )
    );

    @action removeRecipe = (id: number) => {
        this.recipes = this.recipes.filter(r => r.id !== id);
    };
}
