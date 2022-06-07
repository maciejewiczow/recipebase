import React from 'react';
import { Recipe } from 'backend-logic';
import { StyleProp, ViewStyle } from 'react-native';
import init from 'recipebase/src/store/Initalize';
import { ListSeparator, TagList, TagListItem } from './RecipeListItem.styles';
import { observer } from 'mobx-react-lite';

interface ItemTagListProps {
    recipe: Recipe;
    noShowSelectedTags?: boolean;
    style?: StyleProp<ViewStyle>;
}

export const SmallTagList: React.FC<ItemTagListProps> = observer(({ recipe, noShowSelectedTags }) => (
    <TagList
        data={recipe.tags}
        renderItem={({ item }) => (
            <TagListItem
                isSelected={noShowSelectedTags ? false : !!init.tags?.selectedTags.find(t => t.tag.id === item.id)}
            >
                {item.name}
            </TagListItem>
        )}
        ItemSeparatorComponent={() => <ListSeparator>•</ListSeparator>}
        horizontal
    />
));
