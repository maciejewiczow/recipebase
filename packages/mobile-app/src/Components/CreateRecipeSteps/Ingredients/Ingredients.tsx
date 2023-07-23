import React from 'react';
import { IngredientSectionWrapper } from './Ingredients.styles';
import { useRootStore } from '~/RootStoreContext';
import { RecipeIngredientView } from './RecipeIngredientView';
import { TouchableNativeFeedback } from 'react-native';
import { Label } from '~/components/Input/Input.styles';
import { RecipeIngredient } from 'backend-logic';
import {
    AddSectionButton,
    DeleteSectionIcon,
    ScrollableStepWrapper,
    SectionHeader,
    SectionNameInput,
    SectionNameInputRow,
} from '../common.styles';
import { observer } from 'mobx-react-lite';

export const Ingredients: React.FC = observer(() => {
    const { recipes } = useRootStore();

    const addIngredient = (sectionId: number, ri: RecipeIngredient) => () => {
        if (ri.ingredient?.name?.trim() || recipes.draftRecipeQuantityStrings[sectionId]?.[ri.id])
            recipes.addNewDraftRecipeIngredient(sectionId);
    };

    const removeIngredientSection = (sectionId: number) => () => {
        recipes.removeDraftRecipeIngredientSection(sectionId);
    };

    const setIngredientName = (sectionId: number, ingredientId: number) => (name: string) => {
        recipes.setDraftRecipeIngredientName(sectionId, ingredientId, name);
    };

    const setIngredientQuantity = (sectionId: number, ingredientId: number) => (qty: string) => {
        recipes.setDraftRecipeIngredientQuantity(sectionId, ingredientId, qty);
    };

    const setIngredientSectionName = (sectionId: number) => (name: string) => {
        recipes.setDraftRecipeIngredientSectionName(sectionId, name);
    };

    return (
        <ScrollableStepWrapper>
            <SectionHeader>Ingredients</SectionHeader>
            {recipes.draftRecipe.ingredientSections?.length === 1 ? (
                <>
                    {recipes.draftRecipe.ingredientSections[0].recipeIngredients?.map((ri, index) => {
                        const section = recipes.draftRecipe.ingredientSections?.[0];

                        if (!section)
                            return null;

                        return (
                            <RecipeIngredientView
                                ingredient={ri}
                                isLast={index === (section.recipeIngredients?.length ?? 1) - 1}
                                quantity={recipes.draftRecipeQuantityStrings[section.id]?.[ri.id]}
                                addRecipeIngredient={addIngredient(section.id, ri)}
                                setIngredientName={setIngredientName(section.id, ri.id)}
                                setIngredientQuantity={setIngredientQuantity(section.id, ri.id)}
                                key={ri.id}
                            />
                        );
                    })}
                </>
            ) : (
                <>
                    {recipes.draftRecipe.ingredientSections?.map(ingredientSection => (
                        <IngredientSectionWrapper key={ingredientSection.id}>
                            <SectionNameInputRow>
                                <SectionNameInput
                                    label="Section name"
                                    value={ingredientSection.name ?? ''}
                                    onChange={setIngredientSectionName(ingredientSection.id)}
                                />
                                <TouchableNativeFeedback>
                                    <DeleteSectionIcon onPress={removeIngredientSection(ingredientSection.id)} />
                                </TouchableNativeFeedback>
                            </SectionNameInputRow>
                            <Label>Ingredients</Label>
                            {ingredientSection.recipeIngredients?.map((recipeIngredient, index) => (
                                <RecipeIngredientView
                                    ingredient={recipeIngredient}
                                    quantity={recipes.draftRecipeQuantityStrings[ingredientSection.id]?.[recipeIngredient.id]}
                                    isLast={index === (ingredientSection.recipeIngredients?.length ?? 1) - 1}
                                    addRecipeIngredient={addIngredient(ingredientSection.id, recipeIngredient)}
                                    setIngredientName={setIngredientName(ingredientSection.id, recipeIngredient.id)}
                                    setIngredientQuantity={setIngredientQuantity(ingredientSection.id, recipeIngredient.id)}
                                    key={recipeIngredient.id}
                                />
                            ))}
                        </IngredientSectionWrapper>
                    ))}
                </>
            )}
            <AddSectionButton
                onPress={recipes.addNewDraftRecipeIngredientSection}
            >
                Add section
            </AddSectionButton>
        </ScrollableStepWrapper>
    );
});

