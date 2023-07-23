import styled, { css } from 'styled-components/native';
import { TagView as OriginalTagView } from '../TagList/TagView';

export const Wrapper = styled.View`
    flex: 1;
`;

export const TagsWrapper = styled.View`
    flex-flow: row wrap;
`;

export const Label = styled.Text`
    font-size: 13px;
    color: #8F8F8F;
    margin-bottom: 8px;
`;

export const Text = styled.Text`
    color: #555;
`;

export const TagView = styled(OriginalTagView).attrs({
    tagNameStyle: {
        color: '#333',
    },
})`
    ${({ isSelected }) => !isSelected && css`
        background: white;
    `}
    margin-bottom: 8px;
    color: #333;
`;

export const TagNameInput = styled.TextInput`
    padding: 10px 14px;
    height: 40px;
    min-width: 100px;
    background: white;
    color: #333;
    border-radius: ${({ theme }) => theme.border.radius};
`;

export const InputWithDropdownWrapper = styled.View`
    margin-right: 8px;
`;

export const DropdownWrapper = styled.View`
    background-color: white;
    border: 1px solid #eee;
    position: absolute;
    left: 0;
    right: 0;
    top: 40px;
    z-index: 1;
    elevation: 1;
`;

export const DropdownRow = styled.TouchableOpacity`
    background-color: white;
    padding: 6px 8px;
    flex-flow: row nowrap;
    justify-content: space-between;
`;

export const TagNameText = styled.Text`
    color: #444;
`;

export const TagRecipeCountText = styled.Text`
    color: #aaa;
`;
