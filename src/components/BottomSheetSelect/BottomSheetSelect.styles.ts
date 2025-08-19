import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';
import { TextBase } from '../Text';
import { inputStyles } from '../Input/Input.styles';

export const Wrapper = styled.View``;

export const PseudoInput = styled.View`
    ${inputStyles}
`;

export const Placeholder = styled(TextBase)`
    color: ${({ theme }) => theme.palette.text[2]};
`;

export const Value = styled(TextBase)``;

export const ListWrapper = styled.View<{ bottomInset: number }>`
    padding: 0 16px;
    padding-bottom: ${({ bottomInset }) => bottomInset}px;
`;

export const DefaultItemWrapper = styled.View`
    padding: 16px 0;
`;

export const InputRow = styled.View`
    flex-direction: row;
    gap: 12px;
    align-items: center;
`;

export const InputPressable = styled.Pressable`
    flex: 1;
`;

export const DefaultItemText = styled(TextBase).attrs<{ isActive: boolean }>(({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'regular',
}))``;

export const EmptyItemText = styled(DefaultItemText)`
    color: white;
`;

export const SearchInput = styled(BottomSheetTextInput)`
    ${inputStyles}
    padding: 0;
    padding-bottom: 18px;
    border-radius: 0;
    border: 0 solid ${({ theme }) => theme.palette.text[8]};
    border-bottom-width: 1px;
    margin-bottom: 12px;
`;
