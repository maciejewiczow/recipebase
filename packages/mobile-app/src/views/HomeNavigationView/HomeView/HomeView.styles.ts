import styled, { css } from 'styled-components/native';
import FIcon from 'react-native-vector-icons/Fontisto';
import { SearchBar as OriginalSearchBar } from '~/components/SearchBar';
import { createViewIcon } from '../createViewIcon';
import { TagList as OriginalTagList } from '~/components/TagList';
import { RecipeListItem as OriginalRecipeListItem } from './RecipeListItem';
import { RecipeIcon as OriginalRecipeIcon } from '~/components/Svg/RecipeIcon';

export const allMargin = css`
    margin-left: 16px;
    margin-right: 16px;
`;

export const Wrapper = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexGrow: 1,
    },
})`
    background: white;
`;

export const Title = styled.Text`
    font-size: 38px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.primaryAccent};
    ${allMargin}
    margin-top: 24px;
`;

export const Subtitle = styled.Text`
    color: #9E9E9E;
    font-size: 20px;
    ${allMargin}
`;

export const SearchBar = styled(OriginalSearchBar)`
    margin-top: 20px;
    ${allMargin}
`;

export const HomeIcon = createViewIcon(FIcon, 'home')``;

export const RecipeIcon = styled(OriginalRecipeIcon).attrs({
    fill: '#444',
})`
    margin-top: -100px;
    max-height: 260px;
`;

export const EmptyListTitle = styled.Text`
    color: #9E9E9E;
    font-size: 30px;
    margin-bottom: 24px;
    text-align: center;
    margin-top: -50px;
    ${allMargin}
`;

export const EmptyListSubtitle = styled.Text`
    color: #CCCCCC;
    font-size: 22px;
    text-align: center;
    ${allMargin}
`;

export const NoResultsWrapper = styled.View`
    flex: 1;
    ${allMargin}
`;

export const EmptyListWrapper = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    justify-content: center;
    ${allMargin}
`;

export const TagList = styled(OriginalTagList).attrs({ horizontalMargin: 16 })`
    margin-top: 15px;
    margin-bottom: 24px;
`;

export const RecipeListItem = styled(OriginalRecipeListItem)`
    ${allMargin}
`;
