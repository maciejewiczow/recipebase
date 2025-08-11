import React, { useCallback, useDeferredValue, useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { RootNavigationProp } from '~/RootNavigation';
import { useRootStore } from '~/RootStoreContext';
import { catchCancelledFlow } from '~/utils/catchCancelledFlow';
import { EmptyListView } from './EmptyListView';
import { NoSearchResultsListView } from './NoSearchResultsListView';
import {
    Background,
    RecipeListItem,
    SearchBar,
    SettingsIcon,
    SettingsIconWrapper,
    Subtitle,
    TagList,
    Title,
    Wrapper,
} from './HomeView.styles';

export const HomeView: React.FC = observer(() => {
    const navigation = useNavigation<RootNavigationProp>();
    const { recipes, tags } = useRootStore();
    const [searchText, setSearchText] = useState('');
    const deferredSearchText = useDeferredValue(searchText);

    const fetchRecipes = useCallback(() => {
        const promise = recipes.fetchRecipes(deferredSearchText);

        promise.catch(catchCancelledFlow);

        return () => promise.cancel();
    }, [recipes, deferredSearchText]);

    useFocusEffect(fetchRecipes);
    useEffect(fetchRecipes, [fetchRecipes]);

    return (
        <Wrapper>
            <Background>
                <SettingsIconWrapper>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <SettingsIcon />
                    </TouchableOpacity>
                </SettingsIconWrapper>
                <Title>Hello!</Title>
                <Subtitle>What do you want to cook today?</Subtitle>
                <SearchBar
                    searchText={searchText}
                    onChange={setSearchText}
                    placeholder="Search by name, tag..."
                />
                <TagList />
                {recipes.isFetchingRecipes && deferredSearchText === searchText ? (
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
            </Background>
        </Wrapper>
    );
});
