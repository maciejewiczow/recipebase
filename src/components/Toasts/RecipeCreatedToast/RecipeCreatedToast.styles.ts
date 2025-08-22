import styled from 'styled-components/native';
import { TextBase } from '~/components/Text';
import { ToastBody } from '../common.styles';

export const Wrapper = styled(ToastBody)`
    background: ${({ theme }) => theme.palette.success[0]};
    flex-direction: row;
    gap: 18px;
    align-items: center;
`;

export const TextWrapper = styled.View`
    flex: 1;
    gap: 6px;
`;

export const Text = styled(TextBase).attrs({
    size: 'xs',
    fontWeight: 'semiBold',
})`
    text-transform: uppercase;
    line-height: ${({ theme }) => theme.text.normal.lineHeight.sm};
`;

export const LinkText = styled(TextBase).attrs({
    size: 'sm',
    fontWeight: 'bold',
})`
    text-decoration: underline;
`;
