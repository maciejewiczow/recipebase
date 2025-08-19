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
    contentContainerStyle?: StyleProp<ViewStyle>;
}

export const SmallTagList: React.FC<ItemTagListProps> = observer(
    ({ recipe, noHighlightSelected, style, contentContainerStyle }) => {
        const { tags } = useRootStore();

        return (
            <TagList
                style={style}
                contentContainerStyle={contentContainerStyle}
                data={recipe.tags}
                renderItem={({ item }) => (
                    <Observer>
                        {() => (
                            <TagListItem
                                isSelected={
                                    noHighlightSelected
                                        ? false
                                        : tags.selectedTags.some(t => t.tag.id === item.id)
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
    },
);
