import { action, computed, makeAutoObservable } from 'mobx';
import { ILike } from 'typeorm';
import {
    Database,
    IngredientSection,
    Recipe,
    RecipeIngredient,
    RecipeSection,
    RecipeStep,
} from 'backend-logic';
import { TagWithSelectedState } from './Tags';
import { validateRecipe, removeEmptyIngredientsAndSteps, parseQuantityStringsToIngredientQuantities, removeTemporaryIdsFromRecipe } from './recipeUtils';
import { cloneDeep } from 'lodash';

export class Recipes {
    isFetchingRecipes = false;
    recipes: Recipe[] = [];

    currentRecipe?: Recipe;
    isFetchingCurrentRecipe = false;

    draftRecipe = Recipe.createEmpty();
    draftRecipeQuantityStrings: Record<number, Record<number, string>> = {};

    constructor(private database: Database) {
        makeAutoObservable(this);
    }

    *fetchRecipes(searchText: string) {
        this.isFetchingRecipes = true;
        const escapedText = searchText
            .trim()
            .replace(/%/g, '\\%')
            .replace(/_/g, '\\_');

        const matches = escapedText.match(/(?:[^\s"]+|"[^"]*")+/g);

        const terms = matches?.map(term => (term.startsWith('"') && term.endsWith('"') ? term.slice(1, -1) : term)) || [];

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

    @computed filterRecipesByTags = (selectedTags: TagWithSelectedState[]) => (
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
            select: ['coverImage'],
        });

        rcp.coverImage = rcpCover.coverImage ?? '';
        this.currentRecipe = rcp;
        this.isFetchingCurrentRecipe = false;
    }

    @action setDraftRecipeName = (name: string) => {
        this.draftRecipe.name = name;
    };

    @action setDraftRecipeDescription = (desc: string) => {
        this.draftRecipe.description = desc;
    };

    @action setDraftRecipeSource = (url: string) => {
        this.draftRecipe.sourceUrl = url;
    };

    @action setDraftRecipeCoverImage = (image: string) => {
        this.draftRecipe.coverImage = image;
    };

    @action addNewDraftRecipeIngredient = (sectionId?: number) => {
        const section = this.draftRecipe.ingredientSections?.find(is => is.id === sectionId);

        const newRi = RecipeIngredient.createWithTemporaryId();

        if (!sectionId || !section) {
            this.draftRecipe?.ingredientSections?.[0].recipeIngredients?.push(newRi);
            return;
        }

        section?.recipeIngredients?.push(newRi);
    };

    @action addNewDraftRecipeIngredientSection = () => {
        const newSection = IngredientSection.createWithTemporaryId();
        newSection.recipeIngredients = [RecipeIngredient.createWithTemporaryId()];
        this.draftRecipe.ingredientSections?.push(newSection);
    };

    @action removeDraftRecipeIngredientSection = (sectionId: number) => {
        this.draftRecipe.ingredientSections = this.draftRecipe.ingredientSections?.filter(section => section.id !== sectionId);
    };

    @action setDraftRecipeIngredientName = (sectionId: number, ingredientId: number, name: string) => {
        const section = this.draftRecipe.ingredientSections?.find(is => is.id === sectionId);

        if (!section)
            return;

        const recipeIngredient = section.recipeIngredients?.find(ri => ri.id === ingredientId);

        if (!recipeIngredient)
            return;

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        recipeIngredient.ingredient!.name = name;
    };

    @action setDraftRecipeIngredientQuantity = (sectionId: number, ingredientId: number, quantity: string) => {
        if (sectionId in this.draftRecipeQuantityStrings) {
            this.draftRecipeQuantityStrings[sectionId][ingredientId] = quantity;
        } else {
            this.draftRecipeQuantityStrings[sectionId] = {
                [ingredientId]: quantity,
            };
        }
    };

    @action setDraftRecipeIngredientSectionName = (sectionId: number, name: string) => {
        const section = this.draftRecipe.ingredientSections?.find(is => is.id === sectionId);

        if (!section)
            return;

        section.name = name;
    };

    @action addNewDraftRecipeStep = (sectionId: number) => {
        const section = this.draftRecipe.sections?.find(s => s.id === sectionId);

        section?.recipeSteps?.push(RecipeStep.createWithTemporaryId());
    };

    @action setDraftRecipeStepContent = (sectionId: number, stepId: number, content: string) => {
        const section = this.draftRecipe.sections?.find(s => s.id === sectionId);

        if (!section)
            return;

        const step = section.recipeSteps?.find(s => s.id === stepId);

        if (!step)
            return;

        step.content = content;
    };

    @action setDraftRecipeSectionName = (sectionId: number, name: string) => {
        const section = this.draftRecipe.sections?.find(s => s.id === sectionId);

        if (!section)
            return;

        section.name = name;
    };

    @action removeDraftRecipeSection = (sectionId: number) => {
        this.draftRecipe.sections = this.draftRecipe.sections?.filter(section => section.id !== sectionId);
    };

    @action addNewDraftRecipeSection = () => {
        const newSection = RecipeSection.createWithTemporaryId();
        newSection.recipeSteps = [RecipeStep.createWithTemporaryId()];

        this.draftRecipe.sections?.push(newSection);
    };

    @action makeCurrentRecipeEditable = () => {
        if (!this.currentRecipe)
            return;

        this.draftRecipe = this.currentRecipe;

        for (const section of this.draftRecipe.ingredientSections ?? []) {
            for (const recipeIngredient of section.recipeIngredients ?? []) {
                let quantityString = recipeIngredient.quantityFrom.toString();

                if (recipeIngredient.quantityTo)
                    quantityString += '-' + recipeIngredient.quantityTo;

                quantityString += ' ' + recipeIngredient.unit?.name;

                if (section.id in this.draftRecipeQuantityStrings) {
                    this.draftRecipeQuantityStrings[section.id][recipeIngredient.id] = quantityString;
                } else {
                    this.draftRecipeQuantityStrings[section.id] = {
                        [recipeIngredient.id]: quantityString,
                    };
                }
            }
        }

        if (!this.draftRecipe.ingredientSections)
            this.draftRecipe.ingredientSections = [];

        if (!this.draftRecipe.sections)
            this.draftRecipe.sections = [];

        if (this.draftRecipe.ingredientSections.length === 0)
            this.draftRecipe.ingredientSections.push(IngredientSection.createWithTemporaryId());

        if (this.draftRecipe.sections.length === 0)
            this.draftRecipe.sections.push(RecipeSection.createWithTemporaryId());

        for (const section of this.draftRecipe.ingredientSections) {
            if (!section.recipeIngredients)
                section.recipeIngredients = [];

            section.recipeIngredients.push(RecipeIngredient.createWithTemporaryId());
        }

        for (const section of this.draftRecipe.sections) {
            if (!section.recipeSteps)
                section.recipeSteps = [];

            section.recipeSteps?.push(RecipeStep.createWithTemporaryId());
        }
    };

    @action deleteCurrentRecipe = () => {
        if (!this.currentRecipe)
            return;

        this.database.recipeRepository?.softRemove(this.currentRecipe);
        this.recipes = this.recipes.filter(r => r.id !== this.currentRecipe?.id);
        this.currentRecipe = undefined;
    };

    *saveDraftRecipe() {
        const recipeToSave = cloneDeep(this.draftRecipe);

        validateRecipe(recipeToSave);
        removeEmptyIngredientsAndSteps(recipeToSave);
        parseQuantityStringsToIngredientQuantities(recipeToSave, this.draftRecipeQuantityStrings);
        removeTemporaryIdsFromRecipe(recipeToSave);

        const savedRecipe: Recipe = yield this.database.recipeRepository?.save(recipeToSave);

        this.draftRecipe = Recipe.createEmpty();
        this.recipes.push(savedRecipe);

        return savedRecipe;
    }
}
