import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { RootStackParams } from 'recipebase/src/RootNavigation';
import init from 'recipebase/src/store/Initalize';
import { SmallTagList } from 'recipebase/src/views/HomeView/HomeView/SmallTagList';
import {
    ViewWrapper,
    Text,
    Background,
    ContentWrapper,
    RecipeName,
    BottomBarWrapper,
    LeftButton,
    RightButton,
} from './RecipeView.styles';

export const RecipeView: React.FC<NativeStackScreenProps<RootStackParams, 'Recipe'>> = observer(({ route }) => {
    useEffect(() => {
        init.recipes?.fetchRecipeById(route.params.recipeId);
    }, [route.params.recipeId]);

    if (!init.recipes?.currentRecipe || init.recipes.isFetchingCurrentRecipe) {
        return (
            <ViewWrapper>
                <ActivityIndicator color="#777" size={60} />
            </ViewWrapper>
        );
    }

    return (
        <ViewWrapper>
            <Background source={{ uri: `data:image/jpeg;base64,${init.recipes.currentRecipe.coverImage}` }} />
            <ContentWrapper>
                <RecipeName>{init.recipes.currentRecipe.name}</RecipeName>
                <SmallTagList recipe={init.recipes.currentRecipe} noShowSelectedTags />

            </ContentWrapper>
            <BottomBarWrapper>
                <LeftButton><Icon name="chevron-thin-left"/></LeftButton>
                <RightButton>Next step</RightButton>
            </BottomBarWrapper>
        </ViewWrapper>
    );
});
