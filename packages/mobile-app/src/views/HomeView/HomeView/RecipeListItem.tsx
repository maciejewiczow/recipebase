import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Recipe } from 'backend-logic';
import {
    CoverImage,
    ListSeparator,
    Name,
    RecipeItemWrapper,
    TagList,
    TagListItem,
} from './RecipeListItem.styles';

interface RecipeListItemProps {
    recipe: Recipe;
    style?: StyleProp<ViewStyle>;
}

export const RecipeListItem: React.FC<RecipeListItemProps> = ({ recipe, style }) => (
    <RecipeItemWrapper style={style}>
        <CoverImage
            source={{ uri: `data:image/jpeg;base64,${recipe.coverImage}` }}
        />
        <Name>{recipe.name}</Name>
        <TagList
            data={recipe.tags}
            renderItem={({ item }) => <TagListItem>{item.name}</TagListItem>}
            ItemSeparatorComponent={() => <ListSeparator>•</ListSeparator>}
            horizontal
        />
    </RecipeItemWrapper>
);
