import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ActivityIndicator } from 'react-native';
import { EmptyListView } from './EmptyListView';
import {
    Wrapper,
    Subtitle,
    Title,
    SearchBar,
    TagList,
    RecipeListItem,
} from './HomeView.styles';
import { NoSearchResultsListView } from './NoSearchResultsListView';
import { useRootStore } from '~/RootStoreContext';

export const HomeView: React.FC = observer(() => {
    const { recipes, tags } = useRootStore();
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const promise = recipes.fetchRecipes(searchText);

        return () => promise.cancel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText]);

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
                <ActivityIndicator size={60} color="#999" />
            ) : (

                ((recipes.filterRecipesByTags(tags.selectedTags).length ?? 0) > 0) ? (
                    recipes.filterRecipesByTags(tags.selectedTags).map(item => <RecipeListItem key={item.id} recipe={item} />)
                ) : (
                    searchText.trim().length === 0 && (tags.selectedTags.length ?? 0) === 0 ? (
                        <EmptyListView />
                    ) : (
                        <NoSearchResultsListView />
                    )
                )
            )}
        </Wrapper>
    );
});
