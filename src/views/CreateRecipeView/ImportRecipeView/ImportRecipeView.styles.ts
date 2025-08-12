import Icon from '@react-native-vector-icons/ant-design';
import styled from 'styled-components/native';
import { Button } from '~/components/Button';
import { StepHeaderWrapper as OriginalStepHeaderWrapper } from '~/components/CreateRecipeSteps/common.styles';
import { ScrollableGradientSafeAreaBackground } from '~/components/GradientBackground';
import { TextBase } from '~/components/Text';
import { createStyledIcon } from '~/utils/createStyledIcon';

export const OuterWrapper = styled(ScrollableGradientSafeAreaBackground).attrs({
    contentContainerStyle: {
        paddingBottom: 12,
        flex: 1,
    },
})`
    flex: 1;
    padding: 16px 18px;
    padding-top: 0;
`;

export const Wrapper = styled.View`
    gap: 16px;
    flex: 1;
`;

export const MoreInfoIcon = createStyledIcon(Icon, ({ theme }) => ({
    name: 'question-circle',
    size: 22,
    color: theme.palette.text[0],
}));

export const CheckboxPressable = styled.Pressable`
    flex-direction: row;
    gap: 12px;
    align-items: center;
    flex: 1;
`;

export const CheckboxRow = styled.View`
    flex-direction: row;
    gap: 12px;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 8px;
`;

export const CheckboxLabel = styled(TextBase).attrs({
    fontWeight: 'medium',
})``;

export const MainErrorWrapper = styled.View`
    margin-bottom: 8px;
`;

export const MainErrorText = styled.Text`
    color: ${({ theme }) => theme.palette.error[0]};
`;

export const ImportButton = styled(Button).attrs({
    variant: 'primary',
})``;

export const StepHeaderWrapper = styled(OriginalStepHeaderWrapper)`
    margin-bottom: 8px;
`;
