import React, { useMemo, useState } from 'react';
import { Pressable, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RecipeIngredient } from 'backend-logic';
import { observer } from 'mobx-react-lite';
import { Checkbox } from '~/components/Checkbox';
import { useRootStore } from '~/RootStoreContext';
import { ListItem } from './ListItem';
import { ListSectionTitle } from './ListSectionTitle';
import { Section, SectionListData } from './types';
import { SaveButton, Text, Wrapper } from './AddStepIngredientView.styles';

export const AddStepIngredientView: React.FC = observer(() => {
    const { draftRecipe, draftStep } = useRootStore();
    const navigation = useNavigation();
    const [recipeIngredientsToAdd, setRecipeIngredientsToAdd] = useState<RecipeIngredient[]>(
        draftStep.referencedIngredients,
    );

    const listData = useMemo<SectionListData>(
        () => draftRecipe.recipe.ingredientSections
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
            <SectionList<RecipeIngredient, Section>
                sections={listData}
                renderItem={({ item }) => {
                    const isActive = recipeIngredientsToAdd.some(ri => ri.id === item.id);

                    return (
                        <Pressable onPress={addOrRemoveItem(item)}>
                            <ListItem
                                isActive={isActive}
                                leftSection={<Checkbox checked={isActive} />}
                                recipeIngredient={item}
                            />
                        </Pressable>
                    );
                }}
                renderSectionHeader={({ section: { title } }) => (
                    <ListSectionTitle
                        title={title}
                        listDataLength={listData.length}
                    />
                )}
                ListEmptyComponent={<Text>This recipe has no ingredients!</Text>}
            />
            <SaveButton onPress={commitReferencedIngredients}>Save</SaveButton>
        </Wrapper>
    );
});
