import Icon from 'react-native-vector-icons/FontAwesome';
import styled, { css } from 'styled-components/native';
import { createStyledIcon } from '~/utils/createStyledIcon';
import { Button as OriginalButton } from '../Button';

export const TabBarWrapper = styled.View`
    flex-direction: row;
    gap: 2px;
`;

export const TabBarProgressStep = styled.TouchableOpacity<{
    isCompleted: boolean;
    completedTintColor?: string;
}>`
    flex: 1;
    border-bottom-width: 4px;
    border-bottom-color: ${({ theme, isCompleted, completedTintColor }) => (isCompleted ? completedTintColor ?? theme.palette.primary[0] : 'transparent')};
`;

export const BottomBarWrapper = styled.View`
    flex-direction: row;
    gap: 22px;
    padding: 12px;
    background: white;
`;

export const Button = styled(OriginalButton)`
    flex: 1;
`;

export const ScreenWrapper = styled.View`
    flex: 1;
`;

export const IconNext = createStyledIcon(Icon, {
    name: 'angle-right',
    size: 22,
});
