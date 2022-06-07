import React from 'react';
import { RecipeCount, TagBody, TagName } from './TagList.styles';

export interface TagViewProps {
    name: string;
    count?: number;
    isSelected?: boolean;
    onSelect?: () => any;
    isFirstChild?: boolean;
    isLastChild?: boolean;
    horizontalMargin: number;
}

export const TagView: React.FC<TagViewProps> = ({
    isFirstChild,
    isSelected,
    name,
    count,
    onSelect,
    isLastChild,
    horizontalMargin,
}) => (
    <TagBody
        isSelected={isSelected}
        isFirstChild={!!isFirstChild}
        isLastChild={!!isLastChild}
        onPress={onSelect}
        horizontalMargin={horizontalMargin}
    >
        <TagName isSelected={isSelected}>{name}</TagName>
        {count !== undefined && <RecipeCount isSelected={isSelected}>{count}</RecipeCount>}
    </TagBody>
);
