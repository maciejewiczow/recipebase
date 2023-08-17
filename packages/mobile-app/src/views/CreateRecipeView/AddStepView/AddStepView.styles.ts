import styled from 'styled-components/native';
import { Input } from '~/components/Input';

export const StepContentWrapper = styled.View`
    flex: 1;
`;

export const StepContentInput = styled(Input).attrs({
    multiline: true,
    numberOfLines: 10,
})`
    width: 100%;
    margin-bottom: 12px;
`;
