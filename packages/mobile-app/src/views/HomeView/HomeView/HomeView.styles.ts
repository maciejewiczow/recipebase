import styled from 'styled-components/native';
import FIcon from 'react-native-vector-icons/Fontisto';
import { createViewIcon } from '../createViewIcon';

export const Wrapper = styled.ScrollView`
    flex: 1;
    background: white;
    padding: 24px;
`;

export const Title = styled.Text`
    font-size: 38px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.primaryAccent};
`;

export const Subtitle = styled.Text`
    color: #9E9E9E;
    font-size: 20px;
`;

export const HomeIcon = createViewIcon(FIcon, 'home')``;
