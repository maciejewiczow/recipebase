import { computed, makeAutoObservable } from 'mobx';
import { ILike } from 'typeorm';
import { Database, Recipe } from 'backend-logic';
import { TagWithSelectedState } from './Tags';

export class Recipes {
    isFetchingRecipes = false;
    recipes: Recipe[] = [];
    currentRecipe?: Recipe;
    isFetchingCurrentRecipe = false;

    constructor(private database: Database) {
        makeAutoObservable(this);
    }

    *fetchRecipes(searchText: string) {
        this.isFetchingRecipes = true;
        const escapedText = searchText
            .trim()
            .replace(/%/g, '\\%')
            .replace(/_/g, '\\_');

        let terms = escapedText.match(/(?:[^\s"]+|"[^"]*")+/g);

        terms = terms?.map(term => (term.startsWith('"') && term.endsWith('"') ? term.slice(1, -1) : term)) || [];

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

        this.isFetchingRecipes = false;
    }

    @computed
    filterRecipesByTags = (selectedTags: TagWithSelectedState[]) => (
        this.recipes.filter(rc => selectedTags
            ?.every(selectedTag => rc.tags
                ?.find(tag => selectedTag.tag.id === tag.id)
            )
        )
    );

    *fetchRecipeById(id: Recipe['id']) {
        this.isFetchingCurrentRecipe = true;
        const rcp: Recipe = yield this.database.recipeRepository?.findOne({
            where: { id },
            select: ['id', 'description', 'ingredientSections', 'name', 'tags', 'sections'],
            relations: [
                'ingredientSections',
                'ingredientSections.recipeIngredients',
                'ingredientSections.recipeIngredients.unit',
                'ingredientSections.recipeIngredients.ingredient',
                'sections',
                'sections.recipeSteps',
                'tags',
            ],
            cache: true,
        });
        const rcpCover: Partial<Recipe> = yield this.database.recipeRepository?.findOne({
            where: { id },
            select: [ 'coverImage' ],
        });

        rcp.coverImage = rcpCover.coverImage || '';
        this.currentRecipe = rcp;
        this.isFetchingCurrentRecipe = false;
    }
}
