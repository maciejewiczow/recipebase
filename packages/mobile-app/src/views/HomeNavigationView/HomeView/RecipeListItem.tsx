import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Recipe } from 'backend-logic';
import init from 'recipebase/src/store/Initalize';
import {
    CoverImage,
    ListSeparator,
    Name,
    RecipeItemWrapper,
    TagList,
    TagListItem,
} from './RecipeListItem.styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from 'recipebase/src/RootNavigation';
import { SmallTagList } from './SmallTagList';

interface RecipeListItemProps {
    recipe: Recipe;
    style?: StyleProp<ViewStyle>;
}

export const RecipeListItem: React.FC<RecipeListItemProps> = observer(({ recipe, style }) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    return (
        <RecipeItemWrapper style={style} onPress={() => navigation.navigate('Recipe', { recipeId: recipe.id })}>
            <CoverImage source={{ uri: `data:image/jpeg;base64,${recipe.coverImage}` }} />
            <Name>{recipe.name}</Name>
            <SmallTagList recipe={recipe} />
        </RecipeItemWrapper>
    );
});
