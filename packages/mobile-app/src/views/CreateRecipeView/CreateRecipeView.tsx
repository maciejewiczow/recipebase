import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Details, Import, Ingredients, NameAndPhoto, Steps, Tags } from '~/components/CreateRecipeSteps';
import { Stepper } from '~/components/Stepper';
import { RootNavigationProp } from '~/RootNavigation';
import { useRootStore } from '~/RootStoreContext';

export const CreateRecipeView: React.FC = () => {
    const { draftRecipe, tags } = useRootStore();
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
                await tags.saveDraftTags();

                const { id } = await draftRecipe.save();
                navigation.navigate('Recipe', { recipeId: id });
            }}
        />
    );
};
