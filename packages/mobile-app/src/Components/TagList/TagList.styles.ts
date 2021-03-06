import { FlatList } from 'react-native';
import styled, { css } from 'styled-components/native';

interface IsSelectedProps {
    isSelected?: boolean;
}

interface OrderProps {
    isFirstChild: boolean;
    isLastChild: boolean;
}

export const TagBody = styled.TouchableOpacity<IsSelectedProps & OrderProps & { horizontalMargin: number }>`
    padding: 10px 14px;
    height: 40px;
    margin-right: 8px;
    background: ${({ isSelected }) => (isSelected ? '#F2994A7D' : '#F3F3F3')};
    flex-flow: row nowrap;
    justify-content: space-between;
    min-width: 85px;
    border-radius: ${({ theme }) => theme.border.radiusBig};

    ${({ isFirstChild, horizontalMargin }) => isFirstChild && css`
        margin-left: ${horizontalMargin}px;
    `}

    ${({ isLastChild, horizontalMargin }) => isLastChild && css`
        margin-right: ${horizontalMargin}px;
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
