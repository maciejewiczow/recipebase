import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { StepWrapper } from '~/components/CreateRecipeSteps/common.styles';
import { RootStackParams } from '~/RootNavigation';
import { useRootStore } from '~/RootStoreContext';
import { StepIngredientList } from './StepIngredientList/StepIngredientList';
import { SaveButton } from '../AddIngredientView/AddIngredientView.styles';
import { AddIcon, AddIngredientButton, StepContentInput, StepContentWrapper } from './AddStepView.styles';

export interface AddStepViewRouteProps {
    targetSectionId: number;
    stepToEditId?: number;
}

export const AddStepView: React.FC<NativeStackScreenProps<RootStackParams, 'AddStepView'>> = observer(
    ({
        route: {
            params: { targetSectionId, stepToEditId },
        },
        navigation,
    }) => {
        const { draftRecipe, draftStep } = useRootStore();

        useEffect(() => {
            if (stepToEditId !== undefined) {
                const stepToEdit = draftRecipe.getStepById(stepToEditId);

                if (stepToEdit) {
                    draftStep.setStep(stepToEdit);
                }
            } else {
                draftStep.reset();
            }
        }, [draftRecipe, draftStep, stepToEditId]);

        const saveStep = () => {
            if (stepToEditId === undefined) {
                draftRecipe.addNewStep(targetSectionId, draftStep.step);
            }

            draftStep.reset();
            navigation.goBack();
        };

        return (
            <StepWrapper>
                <StepContentWrapper>
                    <StepContentInput
                        value={draftStep.content}
                        onChange={draftStep.setContent}
                        placeholder="Chop the onions, dice the carrot, etc..."
                    />
                    <AddIngredientButton onPress={() => navigation.navigate('AddStepIngredientView')}>
                        <AddIcon />
                        Used ingredients
                    </AddIngredientButton>
                    <StepIngredientList />
                </StepContentWrapper>
                <SaveButton onPress={saveStep}>Save</SaveButton>
            </StepWrapper>
        );
    },
);
