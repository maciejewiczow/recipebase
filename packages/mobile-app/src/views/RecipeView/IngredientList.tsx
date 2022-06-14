import { observer } from 'mobx-react-lite';
import React from 'react';
import { useRootStore } from 'recipebase/src/RootStoreContext';
import { capitalize } from 'recipebase/src/utils/capitalize';
import { round } from 'recipebase/src/utils/round';
import {
    IngredientRow,
    Ingredients,
    IngredientText,
    SectionTitle,
    Text,
} from './RecipeView.styles';

export interface IngredientListProps {
    multiplier: number;
}

export const IngredientList: React.FC<IngredientListProps> = observer(({ multiplier }) => {
    const root = useRootStore();

    if (!root.recipes?.currentRecipe)
        return null;

    if ((root.recipes?.currentRecipe?.ingredientSections?.length ?? 0) === 0)
        return <Ingredients><Text>No ingredients to show</Text></Ingredients>;

    return (
        <Ingredients>{
            root.recipes.currentRecipe.ingredientSections?.flatMap((section, si) => ([
                (root.recipes?.currentRecipe?.ingredientSections?.length ?? 0) > 1 && section.name && (
                    <SectionTitle isFirstChild={si === 0} key={section.id}>{section.name}</SectionTitle>
                ),
                ...(section.recipeIngredients?.map(rcpIngr => (
                    <IngredientRow key={`${section.id}_${rcpIngr.id}`}>
                        <IngredientText>• {capitalize(rcpIngr.ingredient?.name || '')} </IngredientText>
                        <IngredientText>
                            {round(rcpIngr.quantityFrom * multiplier, 2)}
                            {rcpIngr.quantityTo && `—${round(rcpIngr.quantityTo * multiplier, 2)}`} {rcpIngr.unit?.name}
                        </IngredientText>
                    </IngredientRow>
                )) ?? []),
            ]))
        }</Ingredients>
    );
});
