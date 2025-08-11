import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Recipe } from 'backend-logic';
import { Observer, observer } from 'mobx-react-lite';
import { useRootStore } from '~/RootStoreContext';
import { ListSeparator, TagList, TagListItem } from './RecipeListItem.styles';

interface ItemTagListProps {
    recipe: Recipe;
    noHighlightSelected?: boolean;
    style?: StyleProp<ViewStyle>;
}

export const SmallTagList: React.FC<ItemTagListProps> = observer(({ recipe, noHighlightSelected }) => {
    const { tags } = useRootStore();

    return (
        <TagList
            data={recipe.tags}
            renderItem={({ item }) => (
                <Observer>
                    {() => (
                        <TagListItem
                            isSelected={
                                noHighlightSelected
                                    ? false
                                    : !!tags.selectedTags.find(t => t.tag.id === item.id)
                            }
                        >
                            {item.name}
                        </TagListItem>
                    )}
                </Observer>
            )}
            ItemSeparatorComponent={() => <ListSeparator>/</ListSeparator>}
            horizontal
        />
    );
});
