import styled from 'styled-components/native';
import { TextBase } from '~/components/Text';

export const Wrapper = styled.View`
    align-items: center;
`;

export const StepNumberText = styled(TextBase)``;

export const Line = styled.View`
    flex: 1;
    border: 0 solid ${({ theme }) => theme.palette.text[0]};
    border-right-width: 1px;
`;
