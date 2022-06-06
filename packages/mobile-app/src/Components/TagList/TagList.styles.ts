import { FlatList } from 'react-native';
import styled, { css } from 'styled-components/native';

interface IsSelectedProps {
    isSelected?: boolean;
}

export const TagBody = styled.TouchableOpacity<IsSelectedProps & { isFirstChild: boolean; isLastChild: boolean }>`
    padding: 10px 14px;
    height: 40px;
    margin-right: 8px;
    background: ${({ isSelected }) => (isSelected ? '#F2994A7D' : '#F3F3F3')};
    flex-flow: row nowrap;
    justify-content: space-between;
    min-width: 85px;
    border-radius: 14px;

    ${({ isFirstChild }) => isFirstChild && css`
        margin-left: 16px;
    `}

    ${({ isLastChild }) => isLastChild && css`
        margin-right: 16px;
    `}
`;

export const TagName = styled.Text<IsSelectedProps>`
    color: ${({ isSelected }) => (isSelected ? '#D96C0B' : '#9D9D9D')};
`;

export const RecipeCount = styled.Text<IsSelectedProps>`
    color: ${({ isSelected }) => (isSelected ? '#D96C0B99' : '#9D9D9D99')};
    margin-left: 8px;
`;

export const List = styled.FlatList`
    height: 40px;
    flex-grow: 0;
` as unknown as typeof FlatList;
