import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { RootStackParams } from '~/RootNavigation';
import { useRootStore } from '~/RootStoreContext';
import { StepHeader, StepWrapper } from '~/components/CreateRecipeSteps/common.styles';
import { IngredientNameInput, InputsRow, QuantityInput, SaveButton } from './AddIngredientView.styles';
import { observer } from 'mobx-react-lite';
import { IngredientList } from './IngredientList';
import { UnitSelect } from './UnitSelect';

export interface ViewProps {
    targetSectionId: number;
}

export const AddIngredientView: React.FC<NativeStackScreenProps<RootStackParams, 'AddIngredientView'>> = observer(({
    route: { params: { targetSectionId } },
    navigation,
}) => {
    const { draftRecipe, draftIngredient } = useRootStore();
    const [isInIngredientSearchMode, setIsInIngredientSearchMode] = useState(true);

    const saveIngredient = () => {
        draftIngredient.commitSelectedIngredient();
        draftRecipe.addNewRecipeIngredient(targetSectionId, draftIngredient.recipeIngredient);
        draftIngredient.reset();
        navigation.goBack();
    };

    return (
        <StepWrapper>
            <StepHeader>New ingredient</StepHeader>
            <IngredientNameInput
                label="Ingredient name"
                placeholder="Search for ingredients"
                onFocus={() => setIsInIngredientSearchMode(true)}
                value={draftIngredient.ingredient.name}
                onChange={draftIngredient.setName}
            />
            {isInIngredientSearchMode ? (
                <IngredientList
                    setIsInIngredientSearchMode={setIsInIngredientSearchMode}
                />
            ) : (
                <InputsRow>
                    <QuantityInput
                        label="Quantity"
                        placeholder="1 or 1/2..."
                        value={draftIngredient.quantityString}
                        onChange={draftIngredient.setQuantityString}
                    />
                    <UnitSelect />
                </InputsRow>
            )}
            <SaveButton onPress={saveIngredient}>
                Save
            </SaveButton>
        </StepWrapper>
    );
});
