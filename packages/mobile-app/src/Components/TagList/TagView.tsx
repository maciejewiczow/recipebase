import React from 'react';
import { RecipeCount, TagBody, TagName } from './TagList.styles';

export interface TagViewProps {
    isSelected?: boolean;
    name: string;
    count?: number;
    isFirstChild?: boolean;
    isLastChild?: boolean;
    onSelect?: () => any;
}

export const TagView: React.FC<TagViewProps> = ({ isFirstChild, isSelected, name, count, onSelect, isLastChild }) => (
    <TagBody
        isSelected={isSelected}
        isFirstChild={!!isFirstChild}
        isLastChild={!!isLastChild}
        onPress={onSelect}
    >
        <TagName isSelected={isSelected}>{name}</TagName>
        {count !== undefined && <RecipeCount isSelected={isSelected}>{count}</RecipeCount>}
    </TagBody>
);
