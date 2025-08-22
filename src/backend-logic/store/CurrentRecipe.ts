import { cloneDeep } from 'lodash';
import { action, flow, makeAutoObservable } from 'mobx';
import { EntityManager } from 'typeorm';
import { Database } from '../Database';
import { Ingredient } from '../entities/Ingredient';
import { IngredientSection } from '../entities/IngredientSection';
import { Recipe } from '../entities/Recipe';
import { RecipeIngredient } from '../entities/RecipeIngredient';
import { RecipeSection } from '../entities/RecipeSection';
import { RecipeStep } from '../entities/RecipeStep';
import { Unit } from '../entities/Unit';
import { yieldResult } from '../utils/yieldResult';

export class CurrentRecipe {
    recipe?: Recipe;
    isFetchingCurrentRecipe = false;
    ingredientMultiplier = 1;

    constructor(private database: Database) {
        makeAutoObservable(this);
    }

    fetchRecipeById = flow(function* (this: CurrentRecipe, id: Recipe['id']) {
        if (this.recipe?.id === id) {
            return;
        }

        try {
            this.ingredientMultiplier = 1;
            this.isFetchingCurrentRecipe = true;

            const rcp = yield* yieldResult(() =>
                this.database.recipeRepository.findOne({
                    where: { id },
                    select: ['id', 'description', 'ingredientSections', 'name', 'tags', 'sections'],
                    relations: [
                        'ingredientSections',
                        'ingredientSections.recipeIngredients',
                        'ingredientSections.recipeIngredients.unit',
                        'ingredientSections.recipeIngredients.ingredient',
                        'sections',
                        'sections.recipeSteps',
                        'sections.recipeSteps.referencedIngredients',
                        'sections.recipeSteps.referencedIngredients.ingredient',
                        'sections.recipeSteps.referencedIngredients.unit',
                        'tags',
                    ],
                    cache: true,
                }),
            )();

            if (!rcp) {
                return;
            }

            const rcpCover = yield* yieldResult(() =>
                this.database.recipeRepository.findOne({
                    where: { id },
                    select: ['coverImage'],
                }),
            )();

            rcp.coverImage = rcpCover?.coverImage ?? '';
            this.recipe = rcp;
        } finally {
            this.isFetchingCurrentRecipe = false;
        }
    });

    get currentRecipeForEditing() {
        if (!this.recipe) {
            return;
        }

        const draftRecipe = cloneDeep(this.recipe);

        if (!draftRecipe.ingredientSections) {
            draftRecipe.ingredientSections = [];
        }

        if (!draftRecipe.sections) {
            draftRecipe.sections = [];
        }

        if (draftRecipe.ingredientSections.length === 0) {
            draftRecipe.ingredientSections.push(IngredientSection.createWithTemporaryId());
        }

        if (draftRecipe.sections.length === 0) {
            draftRecipe.sections.push(RecipeSection.createWithTemporaryId());
        }

        return draftRecipe;
    }

    @action setIngredientMultiplier(mult: number) {
        this.ingredientMultiplier = mult;
    }

    delete = flow(function* (this: CurrentRecipe) {
        if (!this.recipe) {
            return;
        }

        yield this.database.transaction(manager => this.deleteTransaction(manager));

        const removedId = this.recipe.id;
        this.recipe = undefined;

        return removedId;
    });

    private deleteTransaction = flow(function* (this: CurrentRecipe, manager: EntityManager) {
        if (!this.recipe) {
            return;
        }

        for (const ingredientSection of this.recipe.ingredientSections ?? []) {
            for (const recipeIngredient of ingredientSection.recipeIngredients ?? []) {
                if (recipeIngredient.unit) {
                    const other = yield* yieldResult(() =>
                        manager.getRepository(RecipeIngredient).find({
                            where: {
                                unit: recipeIngredient.unit,
                            },
                            relations: ['unit'],
                        }),
                    )();

                    if ((other.length === 1 && other[0].id === recipeIngredient.id) || other.length === 0) {
                        yield manager.getRepository(Unit).softRemove(recipeIngredient.unit);
                    }
                }

                if (recipeIngredient.ingredient) {
                    const other = yield* yieldResult(() =>
                        manager.getRepository(RecipeIngredient).find({
                            where: {
                                ingredient: recipeIngredient.ingredient,
                            },
                            relations: ['ingredient'],
                        }),
                    )();

                    if ((other.length === 1 && other[0].id === recipeIngredient.id) || other.length === 0) {
                        yield manager.getRepository(Ingredient).softRemove(recipeIngredient.ingredient);
                    }
                }

                yield manager.getRepository(RecipeIngredient).softRemove(recipeIngredient);
            }

            yield manager.getRepository(IngredientSection).softRemove(ingredientSection);
        }

        for (const recipeSection of this.recipe.sections ?? []) {
            yield manager.getRepository(RecipeStep).softRemove(recipeSection.recipeSteps ?? []);
            yield manager.getRepository(RecipeSection).softRemove(recipeSection);
        }

        yield manager.getRepository(Recipe).softRemove(this.recipe);
    });
}
