import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

export const SearchIcon = styled(Icon).attrs({
    name: 'search',
    size: 35,
    color: '#CBCACA',
})`
    margin: 0 10px;
`;

export const InputWrapper = styled.View`
    background: #F3F3F3;
    border-radius: 14px;
    padding: 0 10px;
    flex-flow: row nowrap;
    height: 60px;
    align-items: center;
`;

export const Input = styled.TextInput.attrs({ placeholderTextColor: '#CBCACA' })`
    flex: 1;
    color: #777;
    font-size: 20px;
`;
