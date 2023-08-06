import styled from 'styled-components/native';
import { inputStyles } from '../Input/Input.styles';
import { Input } from '../Input';

export const Wrapper = styled.View`
    flex: 1;
`;

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
