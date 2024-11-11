import React from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Details, Import, Ingredients, NameAndPhoto, Steps, Tags } from '~/components/CreateRecipeSteps';
import { Stepper } from '~/components/Stepper';
import { RootNavigationProp } from '~/RootNavigation';
import { useRootStore } from '~/RootStoreContext';

export type StepNames = 'Import' | 'NameAndPhoto' | 'Details' | 'Ingredients' | 'Steps' | 'Tags';

export const CreateRecipeView: React.FC = () => {
    const { draftRecipe, tags } = useRootStore();
    const navigation = useNavigation<RootNavigationProp>();

    return (
        <Stepper<StepNames>
            steps={[
                { name: 'Import', component: Import },
                { name: 'NameAndPhoto', component: NameAndPhoto },
                { name: 'Details', component: Details },
                { name: 'Ingredients', component: Ingredients },
                { name: 'Steps', component: Steps },
                { name: 'Tags', component: Tags },
            ]}
            lastStepButtonText="Create"
            lastStepButtonLoading={draftRecipe.isSavingRecipe}
            onFinish={async () => {
                const recipe = await draftRecipe.save();
                await tags.saveDraftTags(recipe);
                navigation.dispatch(StackActions.replace('Recipe', { recipeId: recipe.id }));
            }}
        />
    );
};
