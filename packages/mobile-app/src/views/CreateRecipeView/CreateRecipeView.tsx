import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '~/RootNavigation';
import { useRootStore } from '~/RootStoreContext';
import {
    Import,
    NameAndPhoto,
    Details,
    Steps,
    Ingredients,
    Tags,
} from '~/components/CreateRecipeSteps';
import { Stepper } from '~/components/Stepper';

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
