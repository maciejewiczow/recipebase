import FIcon from 'react-native-vector-icons/Fontisto';
import styled, { css } from 'styled-components/native';
import { SearchBar as OriginalSearchBar } from '~/components/SearchBar';
import { RecipeIcon as OriginalRecipeIcon } from '~/components/Svg/RecipeIcon';
import { TagList as OriginalTagList } from '~/components/TagList';
import { createViewIcon } from '../createViewIcon';
import { RecipeListItem as OriginalRecipeListItem } from './RecipeListItem';

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
    color: ${({ theme }) => theme.palette.primary[0]};
    ${allMargin}
    margin-top: 24px;
`;

export const Subtitle = styled.Text`
    color: #9e9e9e;
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
    color: #9e9e9e;
    font-size: 30px;
    margin-bottom: 24px;
    text-align: center;
    margin-top: -50px;
    ${allMargin}
`;

export const EmptyListSubtitle = styled.Text`
    color: #cccccc;
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
