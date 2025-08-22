import React from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Recipe } from 'backend-logic';
import { observer } from 'mobx-react-lite';
import { RootStackParams } from '~/RootNavigation';
import { SmallTagList } from './SmallTagList';
import { CoverImage, CoverImageShadowWrapper, Name, RecipeItemWrapper } from './RecipeListItem.styles';

interface RecipeListItemProps {
    recipe: Recipe;
    style?: StyleProp<ViewStyle>;
}

export const RecipeListItem: React.FC<RecipeListItemProps> = observer(({ recipe, style }) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const navigate = () => {
        navigation.navigate('Recipe', { recipeId: recipe.id });
    };

    return (
        <RecipeItemWrapper style={style}>
            <Pressable onPress={navigate}>
                <CoverImageShadowWrapper
                    style={{
                        boxShadow: [
                            {
                                offsetX: 0,
                                offsetY: 5,
                                blurRadius: 9,
                                color: 'rgba(0,0,0,0.1)',
                            },
                        ],
                    }}
                >
                    <CoverImage source={{ uri: recipe.coverImage }} />
                </CoverImageShadowWrapper>
            </Pressable>
            <SmallTagList recipe={recipe} />
            <Pressable onPress={navigate}>
                <Name>{recipe.name}</Name>
            </Pressable>
        </RecipeItemWrapper>
    );
});
