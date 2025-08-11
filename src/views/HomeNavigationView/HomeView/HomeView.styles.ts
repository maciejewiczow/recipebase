import { SafeAreaView as OriginalSafeAreaView } from 'react-native-safe-area-context';
import EvilIcon from '@react-native-vector-icons/evil-icons';
import styled, { css } from 'styled-components/native';
import { GradientBackground } from '~/components/GradientBackground';
import { SearchBar as OriginalSearchBar } from '~/components/SearchBar';
import { HomeIconSvg } from '~/components/Svg/HomeIconSvg';
import { RecipeIcon as OriginalRecipeIcon } from '~/components/Svg/RecipeIcon';
import { SettingsIconSvg } from '~/components/Svg/SettingsIconSvg';
import { TagList as OriginalTagList } from '~/components/TagList';
import { HeadingBase, TextBase } from '~/components/Text';
import { createStyledIcon } from '~/utils/createStyledIcon';
import { createViewIcon } from '../createViewIcon';
import { RecipeListItem as OriginalRecipeListItem } from './RecipeListItem';

export const allMargin = css`
    margin-left: 18px;
    margin-right: 18px;
`;

export const Wrapper = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexGrow: 1,
    },
})``;

export const Background = styled(GradientBackground)`
    padding-bottom: 24px;
`;

export const Title = styled(HeadingBase)`
    font-size: ${({ theme }) => theme.text.heading.fontSize['4xl']};
    line-height: ${({ theme }) => theme.text.heading.lineHeight['4xl']};
    ${allMargin}
    margin-top: 32px;
    margin-bottom: -12px;
    text-align: center;
`;

export const Subtitle = styled(TextBase)`
    ${allMargin}
    text-align: center;
`;

export const SearchBar = styled(OriginalSearchBar)`
    margin-top: 32px;
    ${allMargin}
`;

export const HomeIcon = createViewIcon(HomeIconSvg)``;

export const EmptyListTitle = styled(TextBase)`
    font-size: ${({ theme }) => theme.text.normal.fontSize.sm};
    line-height: ${({ theme }) => theme.text.normal.lineHeight.xs};
    font-family: ${({ theme }) => theme.text.normal.font.medium};

    margin-top: 16px;
    margin-bottom: 8px;
    text-align: center;
    ${allMargin}
`;

export const NoResultsWrapper = styled.View`
    flex: 1;
    ${allMargin}
`;

export const EmptyListWrapper = styled.Pressable`
    margin-top: 24px;
    flex: 1;
    align-items: center;
    ${allMargin}
`;

export const TagList = styled(OriginalTagList)`
    margin-top: 15px;
    margin-bottom: 52px;
`;

export const RecipeListItem = styled(OriginalRecipeListItem)`
    ${allMargin}
`;

export const PlusIcon = createStyledIcon(EvilIcon, ({ theme }) => ({
    name: 'plus',
    color: theme.palette.text[0],
    size: 32,
}));

export const RecipeIcon = styled(OriginalRecipeIcon).attrs(({ theme }) => ({
    fill: theme.palette.text[0],
}))``;

export const SettingsIconWrapper = styled.View`
    position: absolute;
    top: 32px;
    right: 18px;
    z-index: 20;
`;

export const SettingsIcon = styled(SettingsIconSvg).attrs(({ theme }) => ({
    fill: theme.palette.text[0],
}))``;

export const SafeAreaView = styled(OriginalSafeAreaView).attrs({ mode: 'margin' })`
    flex: 1;
`;
