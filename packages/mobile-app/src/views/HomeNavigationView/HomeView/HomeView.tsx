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
    const root = useRootStore();
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        root.recipes.fetchRecipes(searchText);
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
            {root.recipes?.isFetchingRecipes ? (
                <ActivityIndicator size={60} color="#999" />
            ) : (

                ((root.recipes.filterRecipesByTags(root.tags.selectedTags).length ?? 0) > 0) ? (
                    root.recipes.filterRecipesByTags(root.tags.selectedTags).map(item => <RecipeListItem key={item.id} recipe={item} />)
                ) : (
                    searchText.trim().length === 0 && (root.tags?.selectedTags.length ?? 0) === 0 ? (
                        <EmptyListView />
                    ) : (
                        <NoSearchResultsListView />
                    )
                )
            )}
        </Wrapper>
    );
});
