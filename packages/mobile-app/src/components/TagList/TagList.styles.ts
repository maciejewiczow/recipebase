import styled, { css } from 'styled-components/native';
import { TextBase } from '../Text';

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

export const TagBody = styled.Pressable<TagBodyProps>`
    padding: 10px 14px;
    height: 44px;
    margin-right: 8px;
    background: ${({ isSelected, theme }) => (isSelected ? theme.palette.primary[1] : theme.palette.secondary[0])};
    flex-flow: row nowrap;
    justify-content: space-between;
    border-radius: ${({ theme }) => theme.border.radiusBig};
    gap: 8px;

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

export const TagName = styled(TextBase)<IsSelectedProps>`
    color: ${({ isSelected, theme }) => (isSelected ? theme.palette.text[5] : theme.palette.text[0])};
    font-family: ${({ theme }) => theme.text.normal.font.medium};
    font-size: ${({ theme }) => theme.text.normal.fontSize.md};
    line-height: ${({ theme }) => theme.text.normal.lineHeight.sm};
`;

export const RecipeCount = styled(TagName)``;
