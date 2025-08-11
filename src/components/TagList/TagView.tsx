import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { RecipeCount, TagBody, TagName } from './TagList.styles';

export interface TagViewProps {
    name: React.ReactNode;
    count?: number;
    isSelected?: boolean;
    onPress?: () => void;
    notPressable?: boolean;
    noMinWidth?: boolean;
    style?: StyleProp<ViewStyle>;
    tagNameStyle?: StyleProp<TextStyle>;
}

export const TagView: React.FC<TagViewProps> = ({
    isSelected,
    name,
    count,
    onPress,
    notPressable,
    noMinWidth,
    style,
    tagNameStyle,
}) => (
    <TagBody
        isSelected={isSelected}
        onPress={onPress}
        disabled={notPressable}
        noMinWidth={noMinWidth}
        style={style}
    >
        <TagName
            style={tagNameStyle}
            isSelected={isSelected}
        >
            {name}
        </TagName>
        {count !== undefined && <RecipeCount isSelected={isSelected}>{count}</RecipeCount>}
    </TagBody>
);
