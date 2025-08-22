import React from 'react';
import Toast from 'react-native-toast-message';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Details, Import, Ingredients, NameAndPhoto, Steps, Tags } from '~/components/CreateRecipeSteps';
import { Step, Stepper, StepperSubNavigator } from '~/components/Stepper';
import { RootNavigationProp } from '~/RootNavigation';
import { useRootStore } from '~/RootStoreContext';

export type StepNames = 'Import' | 'NameAndPhoto' | 'Details' | 'Ingredients' | 'Steps' | 'Tags';

const steps: Step<StepNames, undefined>[] = [
    { name: 'Import', component: Import },
    { name: 'NameAndPhoto', component: NameAndPhoto },
    { name: 'Details', component: Details },
    { name: 'Ingredients', component: Ingredients },
    { name: 'Steps', component: Steps },
    { name: 'Tags', component: Tags },
];

export type CreateRecipeSubNavigator = StepperSubNavigator<StepNames, undefined>;

const navigator = createMaterialTopTabNavigator<Record<StepNames, undefined>>();

export const CreateRecipeView: React.FC = () => {
    const { draftRecipe, tags } = useRootStore();
    const navigation = useNavigation<RootNavigationProp>();

    return (
        <Stepper<StepNames, undefined>
            navigator={navigator}
            steps={steps}
            lastStepButtonText="Create recipe"
            lastStepButtonLoading={draftRecipe.isSavingRecipe || tags.isSavingTags}
            onFinish={async () => {
                const recipe = await draftRecipe.save();
                await tags.saveDraftTags(recipe);
                navigation.dispatch(StackActions.replace('HomeTabNavigator', { screen: 'Home' }));
                Toast.show({
                    type: 'recipeCreated',
                    props: {
                        createdRecipeId: recipe.id,
                    },
                });
            }}
            hideBottomAndTopOnFirstStep
        />
    );
};
