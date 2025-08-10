import styled from 'styled-components/native';
import { Input } from '../Input';
import { TextBase } from '../Text';
import { inputStyles } from '../Input/Input.styles';

export const Wrapper = styled.View``;

export const PseudoInput = styled.View`
    ${inputStyles}
    height: 60px;
`;

export const Placeholder = styled(TextBase)`
    color: ${({ theme }) => theme.palette.text[2]};
`;

export const Value = styled(TextBase)``;

export const ListWrapper = styled.View`
    padding: 0 16px;
    flex: 1;
`;

export const DefaultItemWrapper = styled.View`
    padding: 16px 8px;
`;

export const InputRow = styled.View`
    flex-direction: row;
    gap: 12px;
    align-items: center;
`;

export const InputPressable = styled.Pressable`
    flex: 1;
`;

export const DefaultItemText = styled(TextBase)<{ isActive: boolean }>`
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
`;

export const EmptyItemText = styled(DefaultItemText)`
    color: white;
`;

export const SearchInput = styled(Input).attrs({
    inputStyle: {
        borderRadius: 0,
        borderWidth: 0,
        paddingLeft: 0,
        paddingBottom: 0,
    },
})`
    padding: 0;
    padding-bottom: 18px;
    border-bottom-width: 1px;
    border-color: ${({ theme }) => theme.palette.text[8]};
    margin-bottom: 12px;
`;
