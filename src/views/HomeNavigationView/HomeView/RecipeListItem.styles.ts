import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { HeadingBase, TextBase } from '~/components/Text';

export const RecipeItemWrapper = styled.View`
    margin-bottom: 24px;
    gap: 8px;
`;

export const CoverImage = styled.Image`
    width: 100%;
    height: 225px;
    border-radius: ${({ theme }) => theme.border.radiusGigantic};
    elevation: 2;
`;

export const Name = styled(HeadingBase)`
    font-size: ${({ theme }) => theme.text.heading.fontSize.lg};
    line-height: ${({ theme }) => theme.text.heading.lineHeight.lg};
`;

export const TagList = styled.FlatList`
    flex-grow: 0;
    padding-left: 4px;
` as unknown as typeof FlatList;

export const TagListItem = styled(TextBase)<{ isSelected?: boolean }>`
    color: ${({ isSelected, theme }) => (isSelected ? theme.palette.text[3] : theme.palette.text[0])};
    font-family: ${({ isSelected, theme }) =>
        isSelected ? theme.text.normal.font.bold : theme.text.normal.font.medium};
    font-size: ${({ theme }) => theme.text.normal.fontSize.sm};
    line-height: ${({ theme }) => theme.text.normal.lineHeight.xs};
`;

export const ListSeparator = styled(TextBase)`
    color: ${({ theme }) => theme.palette.text[4]};
    font-size: ${({ theme }) => theme.text.normal.fontSize.sm};
    line-height: ${({ theme }) => theme.text.normal.lineHeight.xs};
    margin: 0 7px;
`;
