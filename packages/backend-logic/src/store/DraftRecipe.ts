import { cloneDeep } from 'lodash';
import { action, flow, makeAutoObservable } from 'mobx';
import { Database } from '../Database';
import { IngredientSection } from '../entities/IngredientSection';
import { Recipe } from '../entities/Recipe';
import { RecipeIngredient } from '../entities/RecipeIngredient';
import { RecipeSection } from '../entities/RecipeSection';
import { RecipeStep } from '../entities/RecipeStep';
import { removeTemporaryIds } from '../utils/removeTemporaryIds';
import { yieldResult } from '../utils/yieldResult';
import { removeEmptyIngredientsAndSteps, saveRecipe, validateRecipe } from './recipeUtils';

export class DraftRecipe {
    recipe = Recipe.createEmpty();
    isSavingRecipe = false;

    constructor(private database: Database) {
        makeAutoObservable(this);
    }

    @action setName = (name: string) => {
        this.recipe.name = name;
    };

    @action setDescription = (desc: string) => {
        this.recipe.description = desc;
    };

    @action setSource = (url: string) => {
        this.recipe.source = url;
    };

    @action setCoverImage = (image: string) => {
        this.recipe.coverImage = image;
    };

    @action addNewIngredientSection = () => {
        const newSection = IngredientSection.createWithTemporaryId();
        newSection.recipeIngredients = [];
        this.recipe.ingredientSections?.push(newSection);

        return newSection;
    };

    @action removeIngredientSection = (sectionId: number) => {
        this.recipe.ingredientSections = this.recipe.ingredientSections?.filter(
            section => section.id !== sectionId,
        );
    };

    @action setIngredientSectionName = (sectionId: number, name: string) => {
        const section = this.recipe.ingredientSections?.find(is => is.id === sectionId);

        if (!section) {
            return;
        }

        section.name = name;
    };

    @action addNewStep = (sectionId: number, step: RecipeStep) => {
        const section = this.recipe.sections?.find(s => s.id === sectionId);

        section?.recipeSteps?.push(step);
    };

    getStepById(stepId: number) {
        return this.recipe.sections
            ?.flatMap(section => section.recipeSteps)
            ?.find(step => step?.id === stepId);
    }

    @action setSectionName = (sectionId: number, name: string) => {
        const section = this.recipe.sections?.find(s => s.id === sectionId);

        if (!section) {
            return;
        }

        section.name = name;
    };

    @action removeSection = (sectionId: number) => {
        this.recipe.sections = this.recipe.sections?.filter(section => section.id !== sectionId);
    };

    @action addNewSection = () => {
        const newSection = RecipeSection.createWithTemporaryId();
        newSection.recipeSteps = [];

        this.recipe.sections?.push(newSection);

        return newSection;
    };

    @action addNewRecipeIngredient = (sectionId: number, ri: RecipeIngredient) => {
        const section = this.recipe.ingredientSections?.find(s => s.id === sectionId);

        if (!section) {
            return;
        }

        if (!section.recipeIngredients) {
            section.recipeIngredients = [];
        }

        section.recipeIngredients?.push(ri);
    };

    @action removeRecipeIngredient = (sectionId: number, recipeIngredientId: number) => {
        const section = this.recipe.ingredientSections?.find(s => s.id === sectionId);

        if (!section) {
            return;
        }

        section.recipeIngredients = section.recipeIngredients?.filter(ri => ri.id !== recipeIngredientId);
    };

    @action removeRecipeStep = (sectionId: number, stepId: number) => {
        const section = this.recipe.sections?.find(s => s.id === sectionId);

        if (!section) {
            return;
        }

        section.recipeSteps = section.recipeSteps?.filter(s => s.id !== stepId);
    };

    @action setIngredientSectionsFromArray = (items: (IngredientSection | RecipeIngredient)[]) => {
        if (
            !items.some(item => item instanceof IngredientSection) &&
            this.recipe.ingredientSections?.[0].recipeIngredients
        ) {
            this.recipe.ingredientSections[0].recipeIngredients = items.filter(
                // prettier-ignore
                (item): item is RecipeIngredient => (
                    item instanceof RecipeIngredient
                ),
            );

            return;
        }

        if (this.recipe.ingredientSections?.[0]) {
            this.recipe.ingredientSections[0].recipeIngredients = [];
        }

        const sections: IngredientSection[] = this.recipe.ingredientSections?.[0]
            ? [this.recipe.ingredientSections?.[0]]
            : [];

        for (const item of items) {
            if (item instanceof IngredientSection) {
                item.recipeIngredients = [];
                sections.push(item);
            } else {
                const section = sections.at(-1);

                section?.recipeIngredients?.push(item);
            }
        }

        this.recipe.ingredientSections = sections;
    };

    @action setRecipeSectionsFromArray = (items: (RecipeStep | RecipeSection)[]) => {
        if (!items.some(item => item instanceof RecipeSection) && this.recipe.sections?.[0].recipeSteps) {
            this.recipe.sections[0].recipeSteps = items.filter(
                (item): item is RecipeStep => item instanceof RecipeStep,
            );

            return;
        }

        if (this.recipe.sections?.[0]) {
            this.recipe.sections[0].recipeSteps = [];
        }

        const sections: RecipeSection[] = this.recipe.sections?.[0] ? [this.recipe.sections?.[0]] : [];

        for (const item of items) {
            if (item instanceof RecipeSection) {
                item.recipeSteps = [];
                sections.push(item);
            } else {
                const section = sections.at(-1);

                section?.recipeSteps?.push(item);
            }
        }

        this.recipe.sections = sections;
    };

    getStepContent(sectionId: number, stepId?: number) {
        const section = this.recipe.sections?.find(s => s.id === sectionId);

        return section?.recipeSteps?.find(s => s.id === stepId)?.content;
    }

    save = flow(function* (this: DraftRecipe) {
        try {
            this.isSavingRecipe = true;
            const recipeToSave = cloneDeep(this.recipe);

            validateRecipe(recipeToSave);
            removeEmptyIngredientsAndSteps(recipeToSave);
            removeTemporaryIds(recipeToSave);

            const savedRecipe = yield* yieldResult(() => saveRecipe(recipeToSave, this.database))();

            this.clear();

            return savedRecipe;
        } finally {
            this.isSavingRecipe = false;
        }
    });

    @action clear() {
        this.recipe = Recipe.createEmpty();
    }
}
