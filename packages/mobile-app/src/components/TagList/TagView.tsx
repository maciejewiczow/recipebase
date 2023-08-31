import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { RecipeCount, TagBody, TagName } from './TagList.styles';

export interface TagViewProps {
    name: string;
    count?: number;
    isSelected?: boolean;
    onPress?: () => any;
    isFirstChild?: boolean;
    isLastChild?: boolean;
    notPressable?: boolean;
    noMinWidth?: boolean;
    horizontalMargin?: number;
    style?: StyleProp<ViewStyle>;
    tagNameStyle?: StyleProp<TextStyle>;
}

export const TagView: React.FC<TagViewProps> = ({
    isFirstChild,
    isSelected,
    name,
    count,
    onPress,
    isLastChild,
    notPressable,
    noMinWidth,
    horizontalMargin = 15,
    style,
    tagNameStyle,
}) => (
    <TagBody
        isSelected={isSelected}
        isFirstChild={!!isFirstChild}
        isLastChild={!!isLastChild}
        onPress={onPress}
        horizontalMargin={horizontalMargin}
        disabled={notPressable}
        noMinWidth={noMinWidth}
        style={style}
    >
        <TagName style={tagNameStyle} isSelected={isSelected}>{name}</TagName>
        {count !== undefined && <RecipeCount isSelected={isSelected}>{count}</RecipeCount>}
    </TagBody>
);
