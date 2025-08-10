import React, { useCallback, useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { LinearTransition } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { Observer, observer } from 'mobx-react-lite';
import { useRootStore } from '~/RootStoreContext';
import { catchCancelledFlow } from '~/utils/catchCancelledFlow';
import { TagView } from './TagView';
import { List, Loader, LoaderWrapper } from './TagList.styles';

export interface TagListProps {
    style?: StyleProp<ViewStyle>;
}

export const TagList: React.FC<TagListProps> = observer(({ style }) => {
    const { tags } = useRootStore();

    const fetchTags = useCallback(() => {
        const promise = tags.fetchTags();

        promise.catch(catchCancelledFlow);

        return () => promise.cancel();
    }, [tags]);

    useFocusEffect(fetchTags);
    useEffect(fetchTags, [fetchTags]);

    return (
        <List
            style={style}
            data={tags.partitionedTags}
            renderItem={({ item }) => (
                <Observer>
                    {() => (
                        <TagView
                            count={item.tag.recipeCount}
                            name={item.tag.name || ''}
                            isSelected={item.isSelected}
                            onPress={() => tags?.toggleTagSelectedById(item.tag.id)}
                        />
                    )}
                </Observer>
            )}
            ListEmptyComponent={
                tags.isLoading ? (
                    <LoaderWrapper>
                        <Loader />
                    </LoaderWrapper>
                ) : undefined
            }
            keyExtractor={item => item.tag.id.toString()}
            itemLayoutAnimation={LinearTransition.springify().damping(15).stiffness(100)}
            horizontal
        />
    );
});
