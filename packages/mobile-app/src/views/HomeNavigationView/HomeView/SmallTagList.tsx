import React from 'react';
import { Recipe } from 'backend-logic';
import { StyleProp, ViewStyle } from 'react-native';
import { ListSeparator, TagList, TagListItem } from './RecipeListItem.styles';
import { Observer, observer } from 'mobx-react-lite';
import { useRootStore } from '~/RootStoreContext';

interface ItemTagListProps {
    recipe: Recipe;
    noHighlightSelected?: boolean;
    style?: StyleProp<ViewStyle>;
}

export const SmallTagList: React.FC<ItemTagListProps> = observer(
    ({ recipe, noHighlightSelected }) => {
        const root = useRootStore();

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
                                        : !!root.tags?.selectedTags.find(
                                              t => t.tag.id === item.id,
                                          )
                                }
                            >
                                {item.name}
                            </TagListItem>
                        )}
                    </Observer>
                )}
                ItemSeparatorComponent={() => <ListSeparator>•</ListSeparator>}
                horizontal
            />
        );
    },
);
