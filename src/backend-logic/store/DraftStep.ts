import { action, makeAutoObservable } from 'mobx';
import { Database } from '../Database';
import { RecipeIngredient } from '../entities/RecipeIngredient';
import { RecipeStep } from '../entities/RecipeStep';

export class DraftStep {
    step = RecipeStep.createWithTemporaryId();

    constructor(private database: Database) {
        makeAutoObservable(this);
    }

    @action setContent = (c: string) => {
        this.step.content = c;
    };

    @action setPhoto = (photo: string | undefined) => {
        this.step.photo = photo;
    };

    @action reset = () => {
        this.step = RecipeStep.createWithTemporaryId();
    };

    @action setStep = (step: RecipeStep) => {
        this.step = step;
    };

    get content() {
        return this.step.content;
    }

    @action
    set referencedIngredients(value: RecipeIngredient[]) {
        this.step.referencedIngredients = value;
    }

    get referencedIngredients() {
        return this.step.referencedIngredients ?? [];
    }
}
