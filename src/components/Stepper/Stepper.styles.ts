import { View } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome';
import styled from 'styled-components/native';
import { createStyledIcon } from '~/utils/createStyledIcon';
import { HeadingBase, TextBase } from '../Text';
import { paddingPx } from '../../views/CreateRecipeView/ViewHeader/ViewHeader.styles';

export const iconOffsetPx = 39;

export const TabBarWrapper = styled.View`
    flex-direction: row;
    gap: 4px;
    background: ${({ theme }) => theme.palette.background[0]};
    padding: ${paddingPx}px;
    padding-top: 0;
`;

export const BottomBarBackground = styled.View<{ bottomInset: number }>`
    flex-direction: row;
    justify-content: space-between;

    gap: 22px;
    padding: 0 22px;
    padding-bottom: ${({ bottomInset }) => bottomInset + 12}px;
    background: ${({ theme }) => theme.palette.background[1]};
    height: ${({ bottomInset }) => bottomInset + 75}px;
`;

export const ButtonIconWrapper = styled.Pressable`
    position: relative;
    bottom: ${iconOffsetPx}px;
    gap: 6px;
    align-items: center;
    opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};
`;

export const ButtonText = styled(TextBase)`
    font-size: ${({ theme }) => theme.text.normal.fontSize['2xs']};
    font-family: ${({ theme }) => theme.text.normal.font.bold};
    text-transform: uppercase;
`;

export const StepNumberWrapper = styled.View`
    padding-top: 16px;
    flex-direction: row;
`;

export const CurrentStepNumber = styled(HeadingBase)`
    font-size: ${({ theme }) => theme.text.heading.fontSize.md};
`;

export const TotalStepCount = styled(CurrentStepNumber)<{ isCompleted: boolean }>`
    color: ${({ theme, isCompleted }) => (isCompleted ? theme.palette.text[0] : theme.palette.text[6])};
`;

export const ScreenWrapper = styled.View`
    flex: 1;
`;

export const IconNext = createStyledIcon(Icon, {
    name: 'angle-right',
    size: 22,
});

export const TabBarProgressStep = styled.View<{
    isCompleted: boolean;
    completedTintColor?: string;
}>`
    flex: 1;
    border-bottom-width: 2px;
    border-bottom-color: ${({ theme, isCompleted, completedTintColor }) =>
        isCompleted ? (completedTintColor ?? theme.palette.primary[0]) : theme.palette.background[7]};
    border-radius: 1px;
`;

export const BottomBarWrapper = styled(View)`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
`;
