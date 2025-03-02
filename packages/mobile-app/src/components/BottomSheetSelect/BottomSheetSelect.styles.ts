import styled from 'styled-components/native';
import { Input } from '../Input';
import { inputStyles } from '../Input/Input.styles';

export const Wrapper = styled.View``;

export const PseudoInput = styled.View`
    ${inputStyles}
    height: 60px;
`;

export const Placeholder = styled.Text`
    color: #bbb;
    font-size: 18px;
`;

export const Value = styled.Text`
    font-size: 18px;
    color: #333;
`;

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

export const DefaultItemText = styled.Text<{ isActive: boolean }>`
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
    font-size: 20px;
    color: #333;
`;

export const EmptyItemText = styled(DefaultItemText)`
    color: white;
`;

export const SearchInput = styled(Input).attrs({
    inputStyle: {
        borderRadius: 0,
        borderWidth: 0,
        paddingLeft: 0,
        paddingBottom: 2,
    },
})`
    padding: 0;
    border-bottom-width: 1px;
    border-color: #aaa;
    margin-bottom: 12px;
`;
