import Icon from '@react-native-vector-icons/evil-icons';
import styled from 'styled-components/native';
import { TextBase } from '~/components/Text';
import { createStyledIcon } from '~/utils/createStyledIcon';
import { ToastBody } from '../common.styles';

export const Wrapper = styled(ToastBody)`
    background: ${({ theme }) => theme.palette.error[1]};
    flex-direction: row;
    gap: 18px;
    align-items: center;
`;

export const TextWrapper = styled.View`
    flex: 1;
    gap: 6px;
`;

export const Heading = styled(TextBase).attrs({
    fontWeight: 'semiBold',
    size: 'sm',
})`
    color: ${({ theme }) => theme.palette.text[5]};
    text-transform: uppercase;
`;

export const Text = styled(TextBase)`
    color: ${({ theme }) => theme.palette.text[5]};
`;

export const ErrorIcon = createStyledIcon(Icon, ({ theme }) => ({
    name: 'exclamation',
    size: 65,
    color: theme.palette.text[5],
}));
