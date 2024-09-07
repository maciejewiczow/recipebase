import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '~/RootStoreContext';
import { catchCancelledFlow } from '~/utils/catchCancelledFlow';
import { EmptyListView } from './EmptyListView';
import { NoSearchResultsListView } from './NoSearchResultsListView';
import { RecipeListItem, SearchBar, Subtitle, TagList, Title, Wrapper } from './HomeView.styles';

export const HomeView: React.FC = observer(() => {
    const { recipes, tags } = useRootStore();
    const [searchText, setSearchText] = useState('');

    const fetchRecipes = useCallback(() => {
        const promise = recipes.fetchRecipes(searchText);

        promise.catch(catchCancelledFlow);

        return () => promise.cancel();
    }, [recipes, searchText]);

    useFocusEffect(fetchRecipes);
    useEffect(fetchRecipes, [fetchRecipes]);

    return (
        <Wrapper>
            <Title>Hello,</Title>
            <Subtitle>what do you want to cook today?</Subtitle>
            <SearchBar
                searchText={searchText}
                onChange={setSearchText}
                placeholder="Search by name, tag..."
            />
            <TagList />
            {recipes.isFetchingRecipes ? (
                <ActivityIndicator
                    size={60}
                    color="#999"
                />
            ) : (recipes.filterRecipesByTags(tags.selectedTags).length ?? 0) > 0 ? (
                recipes.filterRecipesByTags(tags.selectedTags).map(item => (
                    <RecipeListItem
                        key={item.id}
                        recipe={item}
                    />
                ))
            ) : searchText.trim().length === 0 && (tags.selectedTags.length ?? 0) === 0 ? (
                <EmptyListView />
            ) : (
                <NoSearchResultsListView />
            )}
        </Wrapper>
    );
});
