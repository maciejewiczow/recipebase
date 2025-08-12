import { SectionList } from 'react-native';
import EvilIcon from '@react-native-vector-icons/evil-icons';
import styled from 'styled-components/native';
import { Button } from '~/components/Button';
import { containerPadding } from '~/components/CreateRecipeSteps/common.styles';
import { SafeAreaGradientBackground } from '~/components/GradientBackground/SafeAreaGradientBackground';
import { TextBase } from '~/components/Text';
import { createStyledIcon } from '~/utils/createStyledIcon';

export const Background = styled(SafeAreaGradientBackground)`
    ${containerPadding}
    flex: 1;
`;

export const EmptyListWrapper = styled.Pressable`
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;

export const List = styled.SectionList.attrs({
    contentContainerStyle: {
        gap: 8,
    },
})`` as typeof SectionList;

export const EmptyListHeadingText = styled(TextBase).attrs({
    size: 'lg',
})``;

export const EmptyListText = styled(TextBase).attrs({
    size: 'md',
})``;

export const SectionTitleWrapper = styled.View`
    padding: 8px 12px;
`;

export const SectionTitle = styled(TextBase).attrs({
    fontWeight: 'semiBold',
    size: 'md',
})``;

export const SaveButton = styled(Button).attrs({
    variant: 'primary',
})`
    margin-top: 18px;
`;

export const PlusIcon = createStyledIcon(EvilIcon, ({ theme }) => ({
    name: 'plus',
    color: theme.palette.text[0],
    size: 32,
}));
