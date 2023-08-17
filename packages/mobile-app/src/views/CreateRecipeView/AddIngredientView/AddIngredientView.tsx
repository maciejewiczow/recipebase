import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { RootStackParams } from '~/RootNavigation';
import { useRootStore } from '~/RootStoreContext';
import { StepHeader, StepHeaderWithMargin, StepWrapper } from '~/components/CreateRecipeSteps/common.styles';
import { IngredientNameInput, InputsRow, QuantityInput, SaveButton } from './AddIngredientView.styles';
import { observer } from 'mobx-react-lite';
import { IngredientList } from './IngredientList';
import { UnitSelect } from './UnitSelect';

export interface AddIngredientViewRouteProps {
    targetSectionId: number;
    recipeIngredientToEditId?: number;
}

export const AddIngredientView: React.FC<NativeStackScreenProps<RootStackParams, 'AddIngredientView'>> = observer(({
    route: { params: { targetSectionId, recipeIngredientToEditId } },
    navigation,
}) => {
    const isInEditMode = recipeIngredientToEditId !== undefined;

    const { draftRecipe, draftIngredient } = useRootStore();
    const [isInIngredientSearchMode, setIsInIngredientSearchMode] = useState(isInEditMode);

    useEffect(() => {
        setIsInIngredientSearchMode(!isInEditMode);
    }, [isInEditMode]);

    useEffect(() => {
        if (isInEditMode) {
            const ingredient = draftRecipe.recipe.ingredientSections?.[targetSectionId]
                .recipeIngredients?.find(ri => ri.id === recipeIngredientToEditId);

            if (ingredient)
                draftIngredient.setRecipeIngredient(ingredient);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipeIngredientToEditId, targetSectionId]);

    const saveIngredient = () => {
        draftIngredient.commitSelectedIngredient();
        if (!isInEditMode)
            draftRecipe.addNewRecipeIngredient(targetSectionId, draftIngredient.recipeIngredient);
        draftIngredient.reset();
        navigation.goBack();
    };

    return (
        <StepWrapper>
            <StepHeader>Ingredient</StepHeader>
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
