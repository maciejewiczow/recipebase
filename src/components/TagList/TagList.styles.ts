import Animated from 'react-native-reanimated';
import styled, { css } from 'styled-components/native';
import { TextBase } from '../Text';

interface IsSelectedProps {
    isSelected?: boolean;
}

interface MinWidthProps {
    noMinWidth?: boolean;
}

type TagBodyProps = IsSelectedProps & MinWidthProps;

export const TagBody = styled.Pressable<TagBodyProps>`
    padding: 10px 14px;
    background: ${({ isSelected, theme }) =>
        isSelected ? theme.palette.primary[1] : theme.palette.secondary[0]};
    flex-flow: row nowrap;
    justify-content: space-between;
    border-radius: ${({ theme }) => theme.border.radiusBig};
    gap: 8px;

    ${({ noMinWidth }) =>
        !noMinWidth &&
        css`
            min-width: 85px;
        `}
`;

export const TagName = styled(TextBase).attrs<IsSelectedProps>({
    fontWeight: 'semiBold',
})`
    color: ${({ isSelected, theme }) => (isSelected ? theme.palette.text[5] : theme.palette.text[0])};
    line-height: ${({ theme }) => theme.text.normal.lineHeight.sm};
`;

export const RecipeCount = styled(TagName)``;

export const List = styled(Animated.FlatList).attrs({
    contentContainerStyle: {
        paddingRight: 16,
        paddingLeft: 16,
        gap: 8,
        flex: 1,
    },
})`
    flex-grow: 0;
` as typeof Animated.FlatList;

export const LoaderWrapper = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Loader = styled.ActivityIndicator.attrs({
    size: 24,
})``;
