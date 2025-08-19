import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '~/RootStoreContext';
import { RecipeStepLineDecorator } from './RecipeStepLineDecorator';
import { RecipeStepRow, RecipeStepText, SectionTitle, Text } from './RecipeView.styles';

const getKey = (item: number, section: number) => `${section}_${item}`;

interface StepsListProps {
    style?: StyleProp<ViewStyle>;
}

export const StepsList: React.FC<StepsListProps> = observer(() => {
    const { currentRecipe } = useRootStore();

    if (!currentRecipe.recipe) {
        return null;
    }

    if ((currentRecipe.recipe.sections?.length ?? 0) === 0) {
        return <Text>No steps to show</Text>;
    }

    return (
        <View>
            {currentRecipe.recipe.sections?.flatMap((section, sectionIndex) => [
                (currentRecipe.recipe?.sections?.length ?? 0) > 1 && section.name && (
                    <SectionTitle
                        isFirstChild={sectionIndex === 0}
                        key={section.id}
                    >
                        {section.name}
                    </SectionTitle>
                ),
                ...(section.recipeSteps?.map((step, i) => (
                    <RecipeStepRow key={getKey(step.id, section.id)}>
                        <RecipeStepLineDecorator
                            stepNumber={i + 1}
                            isLast={i === (section.recipeSteps?.length ?? 1) - 1}
                        />
                        <RecipeStepText>{step.content}</RecipeStepText>
                    </RecipeStepRow>
                )) ?? []),
            ])}
        </View>
    );
});
