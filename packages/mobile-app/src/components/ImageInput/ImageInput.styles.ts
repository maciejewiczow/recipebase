import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { createStyledIcon } from '~/utils/createStyledIcon';

export const Wrapper = styled.View`
    flex: 1;
`;

export const Label = styled.Text`
    font-size: 13px;
    color: #8f8f8f;
    margin-bottom: 8px;
`;

export const Input = styled.View`
    width: 100%;
    border-radius: ${({ theme }) => theme.border.radius};
    border: 1px solid #acacac;
    padding: 14px 20px;
    color: #000;
    flex-direction: row;
    justify-content: space-between;
`;

export const Placeholder = styled.Text`
    font-size: 18px;
    color: #777;
`;

export const PlusIcon = createStyledIcon(Icon, {
    name: 'plus',
    size: 25,
    color: '#555',
});

export const PickedImage = styled.Image`
    border-radius: ${({ theme }) => theme.border.radius};
    margin-bottom: 12px;
    width: 100%;
    height: 200px;
    border-width: 1px;
    border-color: #aaa;
`;
