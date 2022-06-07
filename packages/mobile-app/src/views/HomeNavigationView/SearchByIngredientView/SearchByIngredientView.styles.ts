import styled from 'styled-components/native';
import { createViewIcon } from '../createViewIcon';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const Wrapper = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Text = styled.Text`
    color: #666;
`;

export const SearchByIngredientIcon = createViewIcon(Icon, 'carrot')``;
