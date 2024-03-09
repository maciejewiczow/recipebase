import { cloneDeep } from 'lodash';
import { action, flow, makeAutoObservable } from 'mobx';
import Database from '../Database';
import IngredientSection from '../entities/IngredientSection';
import Recipe from '../entities/Recipe';
import RecipeSection from '../entities/RecipeSection';
import { yieldResult } from '../utils/yieldResult';

export class CurrentRecipe {
    recipe?: Recipe;
    isFetchingCurrentRecipe = false;

    constructor(private database: Database) {
        makeAutoObservable(this);
    }

    fetchRecipeById = flow(function* (this: CurrentRecipe, id: Recipe['id']) {
        this.isFetchingCurrentRecipe = true;

        const rcp = yield* yieldResult(() => this.database.recipeRepository.findOne({
                where: { id },
                select: [
                    'id',
                    'description',
                    'ingredientSections',
                    'name',
                    'tags',
                    'sections',
                ],
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
            }),
        )();

        if (!rcp) {return;}

        const rcpCover = yield* yieldResult(() => this.database.recipeRepository.findOne({
                where: { id },
                select: ['coverImage'],
            }),
        )();

        rcp.coverImage = rcpCover?.coverImage ?? '';
        this.recipe = rcp;

        this.isFetchingCurrentRecipe = false;
    });

    get currentRecipeForEditing() {
        if (!this.recipe) {return;}

        const draftRecipe = cloneDeep(this.recipe);

        if (!draftRecipe.ingredientSections)
            {draftRecipe.ingredientSections = [];}

        if (!draftRecipe.sections) {draftRecipe.sections = [];}

        if (draftRecipe.ingredientSections.length === 0)
            {draftRecipe.ingredientSections.push(
                IngredientSection.createWithTemporaryId(),
            );}

        if (draftRecipe.sections.length === 0)
            {draftRecipe.sections.push(RecipeSection.createWithTemporaryId());}

        return draftRecipe;
    }

    @action delete = () => {
        if (!this.recipe) {return;}

        this.database.recipeRepository.softRemove(this.recipe);
        const removedId = this.recipe.id;
        this.recipe = undefined;

        return removedId;
    };
}
