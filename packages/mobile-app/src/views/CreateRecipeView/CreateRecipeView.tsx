import { useNavigation } from '@react-navigation/native';
import { Recipe } from 'backend-logic';
import React from 'react';
import { RootNavigationProp } from '~/RootNavigation';
import { useRootStore } from '~/RootStoreContext';
import {
    Details,
    Import,
    Ingredients,
    NameAndPhoto,
    Steps,
    Tags,
} from '~/components/CreateRecipeSteps';
import { Stepper } from '~/components/Stepper';

export const CreateRecipeView: React.FC = () => {
    const { recipes } = useRootStore();
    const navigation = useNavigation<RootNavigationProp>();

    return (
        <Stepper
            steps={[
                { name: 'Import', component: Import },
                { name: 'NameAndPhoto', component: NameAndPhoto },
                { name: 'Details', component: Details },
                { name: 'Ingredients', component: Ingredients },
                { name: 'Steps', component: Steps },
                { name: 'Tags', component: Tags },
            ]}
            lastStepButtonText="Create"
            onFinish={async () => {
                const recipe = await recipes.saveDraftRecipe() as unknown as Recipe;
                navigation.navigate('Recipe', { recipeId: recipe.id });
            }}
        />
    );
};
