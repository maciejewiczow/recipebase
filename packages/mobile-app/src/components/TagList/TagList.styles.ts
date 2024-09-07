import { FlatList } from 'react-native';
import styled, { css } from 'styled-components/native';

interface IsSelectedProps {
    isSelected?: boolean;
}

interface OrderProps {
    isFirstChild: boolean;
    isLastChild: boolean;
}

interface MinWidthProps {
    noMinWidth?: boolean;
}

type TagBodyProps = IsSelectedProps & OrderProps & { horizontalMargin: number } & MinWidthProps;

export const TagBody = styled.TouchableOpacity<TagBodyProps>`
    padding: 10px 14px;
    height: 40px;
    margin-right: 8px;
    background: ${({ isSelected }) => (isSelected ? '#F2994A7D' : '#F3F3F3')};
    flex-flow: row nowrap;
    justify-content: space-between;
    border-radius: ${({ theme }) => theme.border.radiusBig};

    ${({ isFirstChild, horizontalMargin }) => isFirstChild &&
        css`
            margin-left: ${horizontalMargin}px;
        `}

    ${({ isLastChild, horizontalMargin }) => isLastChild &&
        css`
            margin-right: ${horizontalMargin}px;
        `}

    ${({ noMinWidth }) => !noMinWidth &&
        css`
            min-width: 85px;
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
    height: ${({ data }) => ((data?.length ?? 0) > 0 ? '40px' : '0')};
    flex-grow: 0;
` as unknown as typeof FlatList;
