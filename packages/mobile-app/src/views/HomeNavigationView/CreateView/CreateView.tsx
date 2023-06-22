import React, { useState } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { observer } from 'mobx-react-lite';
import { RootStackParams, rootNavigationRef } from 'recipebase/src/RootNavigation';
import { Button, ButtonVariant } from 'recipebase/src/components/Button';
import { TagCreator } from 'recipebase/src/components/TagCreator';
import { useRootStore } from 'recipebase/src/RootStoreContext';
import { Recipe, RecipeIngredient, RecipeStep } from 'recipebase/packages/backend-logic';
import { HomeTabNavigationParams } from '../HomeNavigationView';
import { TouchableNativeFeedback } from 'react-native';
import {
    Wrapper,
    HeroText,
    LineWrapper,
    HorizontalLine,
    OrText,
    Input,
    ImageInput,
    SectionHeader,
    RecipeIngredientWrapper,
    IngredientNameInput,
    IngredientQuantityInput,
    AddSectionButton,
    ElevationWrapper,
    IngredientSectionWrapper,
    SectionNameInputRow,
    SectionNameInput,
    DeleteSectionIcon,
    RecipeStepWrapper,
    DragIcon,
    RecipeStepInput,
    RecipeSectionWrapper,
    SaveButton,
} from './CreateView.styles';
import { Label } from 'recipebase/src/components/Input/Input.styles';
import { StackActions, TabActions } from '@react-navigation/native';

interface RecipeIngredientViewProps {
    ingredient: RecipeIngredient;
    isLast: boolean;
    quantity: string;
    addRecipeIngredient: () => any;
    setIngredientName: (name: string) => any;
    setIngredientQuantity: (quantity: string) => any;
}

const RecipeIngredientView: React.FC<RecipeIngredientViewProps> = observer(({
    ingredient,
    isLast,
    addRecipeIngredient,
    setIngredientName,
    setIngredientQuantity,
    quantity,
}) => (
    <RecipeIngredientWrapper>
        <IngredientNameInput
            placeholder='Ingredient name'
            onEndEditing={isLast ? addRecipeIngredient : undefined}
            value={ingredient.ingredient?.name ?? ''}
            onChange={setIngredientName} />
        <IngredientQuantityInput
            onEndEditing={isLast ? addRecipeIngredient : undefined}
            value={quantity}
            onChange={setIngredientQuantity}
        />
    </RecipeIngredientWrapper>
));

interface RecipeStepViewProps {
    isLast: boolean;
    step: RecipeStep;
    addRecipeStep: () => any;
    setStepContent: (content: string) => any;
    noDragIcon?: boolean;
}

const RecipeStepView: React.FC<RecipeStepViewProps> = observer(({
    addRecipeStep,
    isLast,
    step,
    setStepContent,
    noDragIcon,
}) => (
    <RecipeStepWrapper>
        {!noDragIcon && <DragIcon />}
        <RecipeStepInput
            numberOfLines={5}
            onEndEditing={isLast ? addRecipeStep : undefined}
            value={step.content}
            onChange={setStepContent}
            multiline
        />
    </RecipeStepWrapper>
));

export const CreateView: React.FC<BottomTabScreenProps<HomeTabNavigationParams & RootStackParams, 'Create'>> = observer(({ route, navigation }) => {
    const { isEdit } = route.params;
    const { recipes } = useRootStore();

    const addRecipeIngredient = (sectionId: number, ri: RecipeIngredient) => () => {
        if (ri.ingredient?.name?.trim() || recipes.draftRecipeQuantityStrings[sectionId]?.[ri.id])
            recipes.addNewDraftRecipeIngredient(sectionId);
    };

    const removeRecipeIngredientSection = (sectionId: number) => () => {
        recipes.removeDraftRecipeIngredientSection(sectionId);
    };

    const setRecipeIngredientName = (sectionId: number, ingredientId: number) => (name: string) => {
        recipes.setDraftRecipeIngredientName(sectionId, ingredientId, name);
    };

    const setRecipeIngredientQuantity = (sectionId: number, ingredientId: number) => (qty: string) => {
        recipes.setDraftRecipeIngredientQuantity(sectionId, ingredientId, qty);
    };

    const setIngredientSectionName = (sectionId: number) => (name: string) => {
        recipes.setDraftRecipeIngredientSectionName(sectionId, name);
    };

    const addRecipeStep = (sectionId: number, recipeStep: RecipeStep) => () => {
        if (recipeStep.content)
            recipes.addNewDraftRecipeStep(sectionId);
    };

    const setRecipeStepContent = (sectionId: number, stepId: number) => (content: string) => {
        recipes.setDraftRecipeStepContent(sectionId, stepId, content);
    };

    const setRecipeStectionName = (sectionId: number) => (name: string) => {
        recipes.setDraftRecipeSectionName(sectionId, name);
    };

    const removeRecipeSection = (sectionId: number) => () => {
        recipes.removeDraftRecipeSection(sectionId);
    };

    const saveRecipe = async () => {
        try {
            const savedRecipe = (await recipes.saveDraftRecipe()) as unknown as Recipe;

            if (!savedRecipe)
                throw new Error('There was an error while saving the recipe');

            navigation.dispatch(TabActions.jumpTo('Home'));
            navigation.dispatch(StackActions.replace('Recipe', { recipeId: savedRecipe.id }));
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
                console.log(JSON.stringify(e, null, 4));
            }
        }
    };

    return (
        <Wrapper keyboardShouldPersistTaps="handled">
            <HeroText>{isEdit ? 'Edit recipe' : 'Add recipe'}</HeroText>
            {!isEdit && (
                <>
                    <Button variant={ButtonVariant.primary}>Import from a website</Button>
                    <LineWrapper>
                        <HorizontalLine/>
                        <OrText>or</OrText>
                        <HorizontalLine/>
                    </LineWrapper>
                </>
            )}
            <Input label="Name" value={recipes.draftRecipe.name} onChange={recipes.setDraftRecipeName} />
            <Input
                label="Description"
                numberOfLines={4}
                value={recipes.draftRecipe.description}
                onChange={recipes.setDraftRecipeDescription}
                multiline
            />
            <ImageInput
                label="Cover image"
                value={recipes.draftRecipe.coverImage}
                onChange={recipes.setDraftRecipeCoverImage}
            />
            <Input label="Source" value={recipes.draftRecipe.sourceUrl} onChange={recipes.setDraftRecipeSource} />
            <TagCreator />
            <ElevationWrapper>
                {recipes.draftRecipe.ingredientSections?.length === 1 ? (
                    <>
                        <SectionHeader>Ingredients</SectionHeader>
                        {recipes.draftRecipe.ingredientSections[0].recipeIngredients?.map((ri, index) => {
                            const section = recipes.draftRecipe.ingredientSections?.[0];

                            if (!section)
                                return null;

                            return (
                                <RecipeIngredientView
                                    ingredient={ri}
                                    isLast={index === (section.recipeIngredients?.length ?? 1) - 1}
                                    quantity={recipes.draftRecipeQuantityStrings[section.id]?.[ri.id]}
                                    addRecipeIngredient={addRecipeIngredient(section.id, ri)}
                                    setIngredientName={setRecipeIngredientName(section.id, ri.id)}
                                    setIngredientQuantity={setRecipeIngredientQuantity(section.id, ri.id)}
                                    key={ri.id}
                                />
                            );
                        })}
                    </>
                ) : (
                    <>
                        <SectionHeader>Ingredient sections</SectionHeader>
                        {recipes.draftRecipe.ingredientSections?.map(ingredientSection => (
                            <IngredientSectionWrapper key={ingredientSection.id}>
                                <SectionNameInputRow>
                                    <SectionNameInput
                                        label="Section name"
                                        value={ingredientSection.name ?? ''}
                                        onChange={setIngredientSectionName(ingredientSection.id)}
                                    />
                                    <TouchableNativeFeedback>
                                        <DeleteSectionIcon onPress={removeRecipeIngredientSection(ingredientSection.id)}/>
                                    </TouchableNativeFeedback>
                                </SectionNameInputRow>
                                <Label>Ingredients</Label>
                                {ingredientSection.recipeIngredients?.map((recipeIngredient, index) => (
                                    <RecipeIngredientView
                                        ingredient={recipeIngredient}
                                        quantity={recipes.draftRecipeQuantityStrings[ingredientSection.id]?.[recipeIngredient.id]}
                                        isLast={index === (ingredientSection.recipeIngredients?.length ?? 1) - 1}
                                        addRecipeIngredient={addRecipeIngredient(ingredientSection.id, recipeIngredient)}
                                        setIngredientName={setRecipeIngredientName(ingredientSection.id, recipeIngredient.id)}
                                        setIngredientQuantity={setRecipeIngredientQuantity(ingredientSection.id, recipeIngredient.id)}
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
                <SectionHeader>Recipe steps</SectionHeader>
                {recipes.draftRecipe.sections?.length === 1 ? (
                    recipes.draftRecipe.sections[0].recipeSteps?.map((step, index) => {
                        const section = recipes.draftRecipe.sections?.[0];

                        if (!section)
                            return null;

                        return (
                            <RecipeStepView
                                key={step.id}
                                isLast={index === (section.recipeSteps?.length ?? 0) - 1}
                                step={step}
                                addRecipeStep={addRecipeStep(section.id, step)}
                                setStepContent={setRecipeStepContent(section.id, step.id)}
                                noDragIcon
                            />
                        );
                    })
                ) : (
                    recipes.draftRecipe.sections?.map(section => (
                        <RecipeSectionWrapper key={section.id}>
                            <SectionNameInputRow>
                                <SectionNameInput
                                    value={section.name ?? ''}
                                    label="Section name"
                                    onChange={setRecipeStectionName(section.id)}
                                />
                                <TouchableNativeFeedback
                                    onPress={removeRecipeSection(section.id)}
                                >
                                    <DeleteSectionIcon/>
                                </TouchableNativeFeedback>
                            </SectionNameInputRow>
                            {section.recipeSteps?.map((step, index) => (
                                <RecipeStepView
                                    key={step.id}
                                    isLast={index === (section.recipeSteps?.length ?? 0) - 1}
                                    step={step}
                                    addRecipeStep={addRecipeStep(section.id, step)}
                                    setStepContent={setRecipeStepContent(section.id, step.id)}
                                    noDragIcon
                                />
                            ))}
                        </RecipeSectionWrapper>
                    ))
                )}
                <AddSectionButton
                    onPress={recipes.addNewDraftRecipeSection}
                >
                    Add section
                </AddSectionButton>
            </ElevationWrapper>
            <SaveButton onPress={saveRecipe}>Save</SaveButton>
        </Wrapper>
    );
});
