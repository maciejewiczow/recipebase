import { RecipeStep } from 'backend-logic';
import { useRootStore } from '~/RootStoreContext';

export const useStepIndex = (step: RecipeStep | undefined, targetSectionId?: number) => {
    const { draftRecipe } = useRootStore();

    const section = draftRecipe.recipe.sections?.find(
        s => s.id === (step?.recipeSection?.id ?? targetSectionId),
    );

    if (!section) {
        return undefined;
    }

    const index = section.recipeSteps?.findIndex(rs => rs.id === step?.id);

    if ((index ?? -1) > -1) {
        return index;
    } else {
        return section.recipeSteps?.length ?? 1;
    }
};
