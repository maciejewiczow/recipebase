import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ActivityIndicator } from 'react-native';
import init from 'recipebase/src/store/Initalize';
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

export const HomeView: React.FC = observer(() => {
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        init.recipes?.fetchRecipes(searchText, init.tags?.selectedTags || []);
    }, [searchText]);

    useEffect(() => {
        init.recipes?.filterRecipes(init.tags?.selectedTags || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [init.tags?.selectedTags]);

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
            {init.recipes?.isFetchingRecipes ? (
                <ActivityIndicator size={60} color="#999" />
            ) : (

                ((init.recipes?.filteredRecipes.length ?? 0) > 0) ? (
                    init.recipes?.filteredRecipes.map(item => <RecipeListItem key={item.id} recipe={item} />)
                ) : (
                    searchText.trim().length === 0 && (init.tags?.selectedTags.length ?? -1) > 0 ? (
                        <EmptyListView />
                    ) : (
                        <NoSearchResultsListView />
                    )
                )
            )}
        </Wrapper>
    );
});
