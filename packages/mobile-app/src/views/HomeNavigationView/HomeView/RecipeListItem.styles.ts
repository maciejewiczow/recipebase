import { FlatList } from 'react-native';
import styled from 'styled-components/native';

export const RecipeItemWrapper = styled.TouchableOpacity`
    margin-bottom: 24px;
`;

export const CoverImage = styled.Image`
    width: 100%;
    height: 200px;
    border-radius: ${({ theme }) => theme.border.radiusBig};
    margin-bottom: 10px;
`;

export const Name = styled.Text`
    color: #404040;
    font-size: 24px;
`;

export const TagList = styled.FlatList`
    flex-grow: 0;
    height: ${({ data }) => ((data?.length ?? 0) > 0 ? '30px' : '0')};
    margin-top: 5px;
` as unknown as typeof FlatList;

export const TagListItem = styled.Text<{ isSelected?: boolean }>`
    color: ${({ isSelected, theme }) =>
        isSelected ? theme.palette.primaryAccent : '#00000080'};
`;

export const ListSeparator = styled.Text`
    color: #00000080;
`;
