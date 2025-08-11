import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import {
    StepHeaderBackIconWrapper,
    StepHeaderText,
    StepHeaderWrapper,
    StepWrapper,
} from '~/components/CreateRecipeSteps/common.styles';
import { BackIconSvg } from '~/components/Svg/BackIconSvg';
import { RootStackParams } from '~/RootNavigation';
import { useRootStore } from '~/RootStoreContext';
import { useIngredientListData } from './hooks';
import { IngredientList } from './IngredientList';
import { UnitSelect } from './UnitSelect';
import {
    IngredientNameInput,
    InputsRow,
    ListHeader,
    ListHeaderWrapper,
    QuantityInput,
    SaveButton,
} from './AddIngredientView.styles';

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
            const ingredientSearchInputRef = useRef<TextInput>(null);

            useFocusEffect(
                useCallback(() => {
                    if (!isInEditMode) {
                        ingredientSearchInputRef.current?.focus();
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

            const ingredientListItems = useIngredientListData(isInEditMode);

            const saveIngredient = () => {
                draftIngredient.commitSelectedIngredient();
                if (!isInEditMode) {
                    draftRecipe.addNewRecipeIngredient(targetSectionId, draftIngredient.recipeIngredient);
                }
                draftIngredient.reset();
                navigation.goBack();
            };

            const updateIngredientName = (name: string) => {
                const shouldCopy =
                    draftRecipe.recipe.ingredientSections
                        ?.flatMap(section => section.recipeIngredients ?? [])
                        .some(ri => ri.ingredient?.id === draftIngredient.ingredient.id) ?? false;

                draftIngredient.setName(name, shouldCopy);
            };

            return (
                <StepWrapper>
                    <StepHeaderWrapper>
                        <StepHeaderBackIconWrapper onPress={() => navigation.goBack()}>
                            <BackIconSvg />
                        </StepHeaderBackIconWrapper>
                        <StepHeaderText>Ingredient</StepHeaderText>
                    </StepHeaderWrapper>
                    <IngredientNameInput
                        ref={ingredientSearchInputRef}
                        hasBottomBorderRadius={isInIngredientSearchMode && ingredientListItems.length > 0}
                        label="Ingredient name"
                        placeholder="Search for ingredients"
                        onFocus={() => setIsInIngredientSearchMode(true)}
                        value={draftIngredient.ingredient.name}
                        onChange={updateIngredientName}
                    />
                    {isInIngredientSearchMode ? (
                        <>
                            <ListHeaderWrapper>
                                <ListHeader />
                            </ListHeaderWrapper>
                            <IngredientList
                                setIsInIngredientSearchMode={setIsInIngredientSearchMode}
                                ingredientListItems={ingredientListItems}
                            />
                        </>
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
