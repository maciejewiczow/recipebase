import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { StepHeader, StepWrapper } from '~/components/CreateRecipeSteps/common.styles';
import { RootStackParams } from '~/RootNavigation';
import { useRootStore } from '~/RootStoreContext';
import { IngredientList } from './IngredientList';
import { UnitSelect } from './UnitSelect';
import { IngredientNameInput, InputsRow, QuantityInput, SaveButton } from './AddIngredientView.styles';

export interface AddIngredientViewRouteProps {
    targetSectionId: number;
    recipeIngredientToEditId?: number;
}

export const AddIngredientView: React.FC<NativeStackScreenProps<RootStackParams, 'AddIngredientView'>> =
    observer(
        ({
            route: {
                params: { targetSectionId, recipeIngredientToEditId },
            },
            navigation,
        }) => {
            const isInEditMode = recipeIngredientToEditId !== undefined;

            const { draftRecipe, draftIngredient } = useRootStore();
            const [isInIngredientSearchMode, setIsInIngredientSearchMode] = useState(isInEditMode);
            const inputRef = useRef<TextInput>(null);

            useFocusEffect(
                useCallback(() => {
                    if (!isInEditMode) {
                        inputRef.current?.focus();
                    }

                    return () => draftIngredient.reset();
                }, [draftIngredient, isInEditMode]),
            );

            useEffect(() => {
                setIsInIngredientSearchMode(!isInEditMode);
            }, [isInEditMode]);

            useEffect(() => {
                if (isInEditMode) {
                    const ingredient = draftRecipe.recipe.ingredientSections
                        ?.find(section => section.id === targetSectionId)
                        ?.recipeIngredients?.find(ri => ri.id === recipeIngredientToEditId);

                    if (ingredient) {
                        draftIngredient.setRecipeIngredient(ingredient);
                    }
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [recipeIngredientToEditId, targetSectionId]);

            const saveIngredient = () => {
                draftIngredient.commitSelectedIngredient();
                if (!isInEditMode) {
                    draftRecipe.addNewRecipeIngredient(targetSectionId, draftIngredient.recipeIngredient);
                }
                draftIngredient.reset();
                navigation.goBack();
            };

            return (
                <StepWrapper>
                    <StepHeader>Ingredient</StepHeader>
                    <IngredientNameInput
                        ref={inputRef}
                        label="Ingredient name"
                        placeholder="Search for ingredients"
                        onFocus={() => setIsInIngredientSearchMode(true)}
                        value={draftIngredient.ingredient.name}
                        onChange={draftIngredient.setName}
                    />
                    {isInIngredientSearchMode ? (
                        <IngredientList
                            isInEditMode={isInEditMode}
                            setIsInIngredientSearchMode={setIsInIngredientSearchMode}
                        />
                    ) : (
                        <InputsRow>
                            <QuantityInput
                                label="Quantity"
                                placeholder="1 or 1/2..."
                                value={draftIngredient.quantityString}
                                onChange={draftIngredient.setQuantityString}
                                autoFocus
                            />
                            <UnitSelect />
                        </InputsRow>
                    )}
                    <SaveButton
                        onPress={saveIngredient}
                        disabled={isInIngredientSearchMode}
                    >
                        Save
                    </SaveButton>
                </StepWrapper>
            );
        },
    );
