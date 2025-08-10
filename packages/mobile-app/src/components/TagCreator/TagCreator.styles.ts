import { FlatList } from 'react-native';
import styled, { css } from 'styled-components/native';
import { TagView as OriginalTagView } from '../TagList/TagView';
import { TextBase } from '../Text';
import { inputStyles } from '../Input/Input.styles';

export const TagsWrapper = styled.View`
    flex: 1;
    flex-flow: row wrap;
    gap: 12px;
`;

export const TagView = styled(OriginalTagView)`
    ${({ isSelected, theme }) =>
        isSelected &&
        css`
            background: ${theme.palette.primary[0]};
        `}

    padding: 15px 20px;
`;

export const TagNameInput = styled.TextInput<{ hasAutocompletionItems: boolean }>`
    ${inputStyles}
    font-size: ${({ theme }) => theme.text.normal.fontSize.sm};
    padding: 12px 18px;
    min-width: 165px;
    line-height: ${({ theme }) => theme.text.normal.lineHeight.sm};

    ${({ hasAutocompletionItems }) =>
        hasAutocompletionItems &&
        css`
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        `}
`;

export const DropdownWrapper = styled.View`
    background-color: white;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
    border-bottom-left-radius: ${({ theme }) => theme.border.radiusBig};
    border-bottom-right-radius: ${({ theme }) => theme.border.radiusBig};
    background-color: ${({ theme }) => theme.palette.background[1]};
`;

export const DropdownSeparator = styled.View`
    border: 0 solid rgba(0, 0, 0, 0.15);
    border-bottom-width: 1px;
    margin: 0 12px;
`;

export const DropdownRow = styled.TouchableOpacity`
    padding: 12px 18px;
    flex-flow: row nowrap;
    justify-content: space-between;
`;

export const TagNameText = styled(TextBase).attrs({
    size: 'sm',
    fontWeight: 'medium',
})``;

export const TagRecipeCountText = styled(TextBase).attrs({
    size: 'sm',
    fontWeight: 'regular',
})``;

export const DropdownList = styled.FlatList`
    max-height: 200px;
` as typeof FlatList;

export const InputErrorWrapper = styled.View`
    position: absolute;
    top: 0;
    left: 0;
`;

export const InputErrorText = styled(TextBase).attrs({ size: 'xs', fontWeight: 'bold' })`
    color: ${({ theme }) => theme.palette.error[0]};
`;
