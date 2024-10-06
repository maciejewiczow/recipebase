import React from 'react';
import { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import {
    RecipeIngredientListItem,
    RecipeIngredientListItemProps,
} from '~/components/RecipeIngredientListItem';
import { ListItemWrapper } from './AddStepIngredientView.styles';

interface ListItemProps extends RecipeIngredientListItemProps {
    isActive: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({ isActive, ...rest }) => {
    const progress = useDerivedValue(() => withTiming(isActive ? 1 : 0, {
            duration: 300,
        }),
    );

    const style = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(progress.value, [0, 1], ['transparent', 'white']),
    }));

    return (
        <ListItemWrapper style={style}>
            <RecipeIngredientListItem {...rest} />
        </ListItemWrapper>
    );
};
