import { SectionList } from 'react-native';
import EvilIcon from '@react-native-vector-icons/evil-icons';
import styled from 'styled-components/native';
import { Button } from '~/components/Button';
import { GradientBackground } from '~/components/GradientBackground';
import { TextBase } from '~/components/Text';
import { createStyledIcon } from '~/utils/createStyledIcon';

export const Wrapper = styled(GradientBackground)`
    flex: 1;
    padding: 24px 16px;
`;

export const EmptyListWrapper = styled.Pressable`
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;

export const List = styled.SectionList.attrs({
    contentContainerStyle: {
        flex: 1,
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

export const SectionTitle = styled.Text`
    color: #777;
    font-size: 18px;
`;

export const SaveButton = styled(Button).attrs({
    variant: 'primary',
})``;

export const PlusIcon = createStyledIcon(EvilIcon, ({ theme }) => ({
    name: 'plus',
    color: theme.palette.text[0],
    size: 32,
}));
