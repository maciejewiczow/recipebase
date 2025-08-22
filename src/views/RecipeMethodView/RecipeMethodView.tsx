import React, { useMemo } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Step, Stepper } from '~/components/Stepper';
import { RootStackParams } from '~/RootNavigation';
import { useRootStore } from '~/RootStoreContext';
import { isTruthy } from '~/utils/isTruthy';
import { MethodStepView } from './MethodStepView';
import { StepParams } from './types';

const navigator = createMaterialTopTabNavigator<Record<string, StepParams>>();

export const RecipeMethodView: React.FC<NativeStackScreenProps<RootStackParams>> = ({ navigation }) => {
    const { currentRecipe } = useRootStore();

    const steps = useMemo<Step<string, StepParams>[]>(
        () =>
            currentRecipe.recipe?.sections
                ?.flatMap(section =>
                    section.recipeSteps?.map(step => ({
                        name: `${section.id}_${step.id}`,
                        component: MethodStepView,
                        params: {
                            sectionId: section.id,
                            stepId: step.id,
                        },
                    })),
                )
                .filter(isTruthy) ?? [],
        [currentRecipe.recipe?.sections],
    );

    return (
        <Stepper
            navigator={navigator}
            steps={steps}
            lastStepButtonText="Ready"
            onFinish={() => navigation.goBack()}
        />
    );
};
