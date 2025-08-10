import styled from 'styled-components/native';
import { TextBase } from '~/components/Text';

export const ListHeader = styled(TextBase).attrs({
    fontWeight: 'medium',
})`
    margin-bottom: 6px;
`;

export const ListWrapper = styled.View`
    margin-top: 12px;
    gap: 8px;
`;
