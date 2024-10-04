import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { StepWrapper } from '~/components/CreateRecipeSteps/common.styles';
import { RootStackParams } from '~/RootNavigation';
import { useRootStore } from '~/RootStoreContext';
import { SaveButton } from '../AddIngredientView/AddIngredientView.styles';
import { StepContentInput, StepContentWrapper } from './AddStepView.styles';

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
        const { draftRecipe } = useRootStore();
        const [stepContent, setStepContent] = useState<string>(
            draftRecipe.getStepContent(targetSectionId, stepToEditId) ?? '',
        );

        const saveStep = () => {
            if (stepToEditId === undefined) {
                draftRecipe.addNewStep(targetSectionId, stepContent);
            } else {
                draftRecipe.setStepContent(targetSectionId, stepToEditId, stepContent);
            }

            navigation.goBack();
        };

        return (
            <StepWrapper>
                <StepContentWrapper>
                    <StepContentInput
                        value={stepContent}
                        onChange={setStepContent}
                        placeholder="Chop the onions, dice the carrot, etc..."
                    />
                </StepContentWrapper>
                <SaveButton onPress={saveStep}>Save</SaveButton>
            </StepWrapper>
        );
    },
);
