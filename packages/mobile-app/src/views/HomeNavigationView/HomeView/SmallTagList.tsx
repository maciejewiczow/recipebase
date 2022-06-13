import React from 'react';
import { Recipe } from 'backend-logic';
import { StyleProp, ViewStyle } from 'react-native';
import init from 'recipebase/src/store/Initalize';
import { ListSeparator, TagList, TagListItem } from './RecipeListItem.styles';
import { Observer, observer } from 'mobx-react-lite';

interface ItemTagListProps {
    recipe: Recipe;
    noHighlightSelected?: boolean;
    style?: StyleProp<ViewStyle>;
}

export const SmallTagList: React.FC<ItemTagListProps> = observer(({ recipe, noHighlightSelected }) => (
    <TagList
        data={recipe.tags}
        renderItem={({ item }) => (
            <Observer>
                {() => (
                    <TagListItem
                        isSelected={noHighlightSelected ? false : !!init.tags?.selectedTags.find(t => t.tag.id === item.id)}
                    >
                        {item.name}
                    </TagListItem>
                )}
            </Observer>
        )}
        ItemSeparatorComponent={() => <ListSeparator>•</ListSeparator>}
        horizontal
    />
));
