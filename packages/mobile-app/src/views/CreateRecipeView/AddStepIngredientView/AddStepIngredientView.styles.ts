import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { Button } from '~/components/Button';

export const Wrapper = styled.View`
    flex: 1;
    margin: 8px 0;
`;

export const Text = styled.Text`
    color: #555;
`;

export const SectionTitleWrapper = styled.View`
    padding: 8px 12px;
`;

export const SectionTitle = styled.Text`
    color: #777;
    font-size: 18px;
`;

export const ListItemWrapper = styled(Animated.View)`
    padding: 8px 12px;
`;

export const SaveButton = styled(Button).attrs({
    variant: 'primary',
})`
    margin: 0 12px;
    margin-bottom: 8px;
`;
