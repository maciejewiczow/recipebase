import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Recipe } from 'backend-logic';
import { observer } from 'mobx-react-lite';
import { RootStackParams } from '~/RootNavigation';
import { SmallTagList } from './SmallTagList';
import { CoverImage, Name, RecipeItemWrapper } from './RecipeListItem.styles';

interface RecipeListItemProps {
    recipe: Recipe;
    style?: StyleProp<ViewStyle>;
}

export const RecipeListItem: React.FC<RecipeListItemProps> = observer(({ recipe, style }) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    return (
        <RecipeItemWrapper
            style={style}
            onPress={() => navigation.navigate('Recipe', { recipeId: recipe.id })}
        >
            <CoverImage source={{ uri: recipe.coverImage }} />
            <Name>{recipe.name}</Name>
            <SmallTagList recipe={recipe} />
        </RecipeItemWrapper>
    );
});
