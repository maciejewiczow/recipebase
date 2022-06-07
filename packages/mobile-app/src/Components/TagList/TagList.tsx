import { Observer, observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { FlatList, ListRenderItemInfo, StyleProp, ViewStyle } from 'react-native';
import init from 'recipebase/src/store/Initalize';
import { TagWithSelectedState } from 'recipebase/src/store/Tags';
import { List, TagBody } from './TagList.styles';
import { TagView } from './TagView';

export interface SearchBarProps {
    style?: StyleProp<ViewStyle>;
    horizontalMargin?: number;
}

export const TagList: React.FC<SearchBarProps> = observer(({ style, horizontalMargin = 16 }) => {
    useEffect(() => {
        init.tags?.fetchTags();
    }, []);

    return (
        <List
            style={style}
            data={init.tags?.partitionedTags}
            renderItem={({ item, index }) => (
                <Observer>
                    {() => (
                        <TagView
                            count={item.tag.recipeCount}
                            name={item.tag.name || ''}
                            isSelected={item.isSelected}
                            onSelect={() => init.tags?.toggleTagSelectedById(item.tag.id)}
                            isFirstChild={index === 0}
                            isLastChild={index === (init.tags?.tags.length ?? 1) - 1}
                            horizontalMargin={horizontalMargin}
                        />
                    )}
                </Observer>
            )}
            keyExtractor={(item: TagWithSelectedState) => item.tag.id.toString()}
            horizontal
        />
    );
});