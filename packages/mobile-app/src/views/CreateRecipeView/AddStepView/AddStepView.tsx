import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import {
    AddListItemButtonText,
    StepHeaderBackIconWrapper,
    StepHeaderText,
} from '~/components/CreateRecipeSteps/common.styles';
import { ImageInput } from '~/components/ImageInput';
import { BackIconSvg } from '~/components/Svg/BackIconSvg';
import { RootStackParams } from '~/RootNavigation';
import { useRootStore } from '~/RootStoreContext';
import { useIsKeyboardOpen } from '~/utils/useIsKeyoardOpen';
import { useStepIndex } from './hooks';
import { StepIngredientList } from './StepIngredientList/StepIngredientList';
import { SaveButton } from '../AddIngredientView/AddIngredientView.styles';
import {
    AddListItemButton,
    ScrollableStepWrapper,
    StepContentInput,
    StepContentInputRow,
    StepContentInputWrapper,
    StepContentWrapper,
    StepHeaderWrapper,
    StepNumberText,
    StepNumberWrapper,
} from './AddStepView.styles';

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
        const isKeyboardOpen = useIsKeyboardOpen();

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

        const stepIndex = useStepIndex(draftStep.step, targetSectionId);

        return (
            <ScrollableStepWrapper isKeyboardOpen={isKeyboardOpen}>
                <StepHeaderWrapper>
                    <StepHeaderBackIconWrapper onPress={() => navigation.goBack()}>
                        <BackIconSvg />
                    </StepHeaderBackIconWrapper>
                    <StepHeaderText>Method</StepHeaderText>
                </StepHeaderWrapper>
                <StepContentWrapper>
                    <AddListItemButton onPress={() => navigation.navigate('AddStepIngredientView')}>
                        <AddListItemButtonText>Ingredients in this step</AddListItemButtonText>
                    </AddListItemButton>
                    <StepContentInputWrapper>
                        <StepContentInputRow>
                            {stepIndex !== undefined && (
                                <StepNumberWrapper>
                                    <StepNumberText>{stepIndex + 1}</StepNumberText>
                                </StepNumberWrapper>
                            )}
                            <StepContentInput
                                value={draftStep.content}
                                onChange={draftStep.setContent}
                                placeholder="Describe the step, for ex. chop the onions, carrot etc."
                            />
                        </StepContentInputRow>
                        <ImageInput
                            value={draftStep.step.photo}
                            onChange={draftStep.setPhoto}
                        />
                    </StepContentInputWrapper>
                    <StepIngredientList />
                </StepContentWrapper>
                <SaveButton onPress={saveStep}>Save</SaveButton>
            </ScrollableStepWrapper>
        );
    },
);
