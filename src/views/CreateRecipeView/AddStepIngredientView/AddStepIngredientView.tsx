import React, { useMemo, useState } from 'react';
import { Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RecipeIngredient } from 'backend-logic';
import { observer } from 'mobx-react-lite';
import { Checkbox } from '~/components/Checkbox';
import { StepHeaderBackIconWrapper, StepHeaderText } from '~/components/CreateRecipeSteps/common.styles';
import { RecipeIngredientListItem } from '~/components/RecipeIngredientListItem';
import { BackIconSvg } from '~/components/Svg/BackIconSvg';
import { RootStackParams } from '~/RootNavigation';
import { useRootStore } from '~/RootStoreContext';
import { ListSectionTitle } from './ListSectionTitle';
import { Section, SectionListData } from './types';
import { StepHeaderWrapper } from '../AddStepView/AddStepView.styles';
import {
    EmptyListHeadingText,
    EmptyListText,
    EmptyListWrapper,
    List,
    PlusIcon,
    SaveButton,
    Wrapper,
} from './AddStepIngredientView.styles';

export const AddStepIngredientView: React.FC<
    NativeStackScreenProps<RootStackParams, 'AddStepIngredientView'>
> = observer(({ navigation }) => {
    const { draftRecipe, draftStep } = useRootStore();
    const [recipeIngredientsToAdd, setRecipeIngredientsToAdd] = useState<RecipeIngredient[]>(
        draftStep.referencedIngredients,
    );

    const listData = useMemo<SectionListData>(
        () =>
            draftRecipe.recipe.ingredientSections
                ?.flatMap(({ name, recipeIngredients }) => ({
                    title: name ?? '',
                    data: recipeIngredients ?? [],
                }))
                .filter(({ data }) => data.length > 0) ?? [],
        [draftRecipe.recipe.ingredientSections],
    );

    const addOrRemoveItem = (item: RecipeIngredient) => () => {
        setRecipeIngredientsToAdd(prev => {
            if (prev.some(ri => ri.id === item.id)) {
                return prev.filter(ri => ri.id !== item.id);
            } else {
                return [...prev, item];
            }
        });
    };

    const commitReferencedIngredients = () => {
        draftStep.referencedIngredients = [...recipeIngredientsToAdd];
        navigation.goBack();
    };

    return (
        <Wrapper>
            <StepHeaderWrapper>
                <StepHeaderBackIconWrapper onPress={() => navigation.goBack()}>
                    <BackIconSvg />
                </StepHeaderBackIconWrapper>
                <StepHeaderText>Ingredients in this step</StepHeaderText>
            </StepHeaderWrapper>
            <List<RecipeIngredient, Section>
                sections={listData}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <Pressable onPress={addOrRemoveItem(item)}>
                        <RecipeIngredientListItem
                            leftSection={
                                <Checkbox checked={recipeIngredientsToAdd.some(ri => ri.id === item.id)} />
                            }
                            recipeIngredient={item}
                        />
                    </Pressable>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <ListSectionTitle
                        title={title}
                        listDataLength={listData.length}
                    />
                )}
                ListEmptyComponent={
                    <EmptyListWrapper
                        onPress={() => navigation.navigate('CreateRecipe', { screen: 'Ingredients' })}
                    >
                        <EmptyListHeadingText>This recipe has no ingredients yet!</EmptyListHeadingText>
                        <EmptyListText>Tap here to add an ingredient</EmptyListText>
                        <PlusIcon />
                    </EmptyListWrapper>
                }
            />
            <SaveButton onPress={commitReferencedIngredients}>Save</SaveButton>
        </Wrapper>
    );
});
