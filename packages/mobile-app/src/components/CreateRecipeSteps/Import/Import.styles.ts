import styled from 'styled-components/native';
import { GradientBackground } from '~/components/GradientBackground';
import { TextBase } from '~/components/Text';

export const OrText = styled(TextBase)`
    color: ${({ theme }) => theme.palette.text[6]};
    font-family: ${({ theme }) => theme.text.normal.font.medium};
    text-align: center;
`;

export const Wrapper = styled(GradientBackground)`
    flex: 1;
    justify-content: center;
    padding: 16px;
    gap: 40px;
`;

export const CakeWrapper = styled.View`
    align-items: center;
    justify-content: flex-end;
    flex: 1;
`;

export const ButtonsWrapper = styled.View`
    flex: 2;
    gap: 16px;
`;
