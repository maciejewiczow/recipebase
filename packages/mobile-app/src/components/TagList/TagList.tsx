import React, { useCallback, useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { EntryExitTransition, LinearTransition } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { Observer, observer } from 'mobx-react-lite';
import { useRootStore } from '~/RootStoreContext';
import { catchCancelledFlow } from '~/utils/catchCancelledFlow';
import { TagView } from './TagView';

export interface SearchBarProps {
    style?: StyleProp<ViewStyle>;
    horizontalMargin?: number;
}

export const TagList: React.FC<SearchBarProps> = observer(({ style, horizontalMargin = 16 }) => {
    const { tags } = useRootStore();

    const fetchTags = useCallback(() => {
        const promise = tags.fetchTags();

        promise.catch(catchCancelledFlow);

        return () => promise.cancel();
    }, [tags]);

    useFocusEffect(fetchTags);
    useEffect(fetchTags, [fetchTags]);

    return (
        <Animated.FlatList
            style={[
                style,
                {
                    height: tags.partitionedTags.length > 0 ? 44 : 0,
                    flexGrow: 0,
                },
            ]}
            data={tags.partitionedTags}
            renderItem={({ item, index }) => (
                <Observer>
                    {() => (
                        <TagView
                            count={item.tag.recipeCount}
                            name={item.tag.name || ''}
                            isSelected={item.isSelected}
                            onPress={() => tags?.toggleTagSelectedById(item.tag.id)}
                            isFirstChild={index === 0}
                            isLastChild={index === (tags?.tags.length ?? 1) - 1}
                            horizontalMargin={horizontalMargin}
                        />
                    )}
                </Observer>
            )}
            keyExtractor={item => item.tag.id.toString()}
            itemLayoutAnimation={LinearTransition.springify().damping(10).stiffness(100)}
            horizontal
        />
    );
});
