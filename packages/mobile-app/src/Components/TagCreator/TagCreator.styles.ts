import DropDownPicker from 'react-native-dropdown-picker';
import styled from 'styled-components/native';
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

export const TagView = styled(OriginalTagView)`
    margin-bottom: 8px;
`;

export const TagNameInput = styled.TextInput`
    padding: 10px 14px;
    height: 40px;
    min-width: 100px;
    background: #F3F3F3;
    color: #9D9D9D;
    border-radius: ${({ theme }) => theme.border.radius};
`;

export const InputWithDropdownWrapper = styled.View`
    background: white;
    margin-right: 8px;
`;

export const DropdownWrapper = styled.View`
    background: white;
    border: 1px solid #eee;
    position: absolute;
    left: 0;
    right: 0;
    top: 40px;
`;

export const DropdownRow = styled.TouchableOpacity`
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
