import { action, flow, makeAutoObservable } from 'mobx';
import Database from '../Database';
import Recipe from '../entities/Recipe';
import RecipeSection from '../entities/RecipeSection';
import { cloneDeep } from 'lodash';
import IngredientSection from '../entities/IngredientSection';
import RecipeIngredient from '../entities/RecipeIngredient';
import RecipeStep from '../entities/RecipeStep';
import { removeTemporaryIds } from '../utils/removeTemporaryIds';
import { yieldResult } from '../utils/yieldResult';
import { validateRecipe, removeEmptyIngredientsAndSteps, saveRecipe } from './recipeUtils';

export class DraftRecipe {
    recipe = Recipe.createEmpty();

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
    };

    @action removeIngredientSection = (sectionId: number) => {
        this.recipe.ingredientSections = this.recipe.ingredientSections?.filter(section => section.id !== sectionId);
    };

    @action setIngredientSectionName = (sectionId: number, name: string) => {
        const section = this.recipe.ingredientSections?.find(is => is.id === sectionId);

        if (!section)
            return;

        section.name = name;
    };

    @action addNewStep = (sectionId: number) => {
        const section = this.recipe.sections?.find(s => s.id === sectionId);

        section?.recipeSteps?.push(RecipeStep.createWithTemporaryId());
    };

    @action setStepContent = (sectionId: number, stepId: number, content: string) => {
        const section = this.recipe.sections?.find(s => s.id === sectionId);

        if (!section)
            return;

        const step = section.recipeSteps?.find(s => s.id === stepId);

        if (!step)
            return;

        step.content = content;
    };

    @action setSectionName = (sectionId: number, name: string) => {
        const section = this.recipe.sections?.find(s => s.id === sectionId);

        if (!section)
            return;

        section.name = name;
    };

    @action removeSection = (sectionId: number) => {
        this.recipe.sections = this.recipe.sections?.filter(section => section.id !== sectionId);
    };

    @action addNewSection = () => {
        const newSection = RecipeSection.createWithTemporaryId();
        newSection.recipeSteps = [];

        this.recipe.sections?.push(newSection);
    };

    @action addNewRecipeIngredient = (sectionId: number, ri: RecipeIngredient) => {
        const section = this.recipe.ingredientSections?.find(s => s.id === sectionId);

        if (!section)
            return;

        if (!section.recipeIngredients)
            section.recipeIngredients = [];

        section.recipeIngredients?.push(ri);
    };

    @action setIngredientSectionsFromArray = (items: (IngredientSection | RecipeIngredient)[]) => {
        if (!items.some(item => item instanceof IngredientSection) && this.recipe.ingredientSections?.[0].recipeIngredients) {
            this.recipe.ingredientSections[0].recipeIngredients = items
                .filter((item): item is RecipeIngredient => item instanceof RecipeIngredient);

            return;
        }

        if (this.recipe.ingredientSections?.[0])
            this.recipe.ingredientSections[0].recipeIngredients = [];

        const sections: IngredientSection[] = this.recipe.ingredientSections?.[0] ?
            [this.recipe.ingredientSections?.[0]] :
            [];

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

    save = flow(function* (this: DraftRecipe) {
        const recipeToSave = cloneDeep(this.recipe);

        validateRecipe(recipeToSave);
        removeEmptyIngredientsAndSteps(recipeToSave);
        removeTemporaryIds(recipeToSave);

        const savedRecipe = yield* yieldResult(() => saveRecipe(recipeToSave, this.database))();

        this.recipe = Recipe.createEmpty();

        return savedRecipe;
    });
}
