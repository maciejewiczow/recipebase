import styled from 'styled-components/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createViewIcon } from '../createViewIcon';

export const Wrapper = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Text = styled.Text`
    color: #666;
`;

export const Icon = createViewIcon(IonIcon, 'settings-sharp')``;
