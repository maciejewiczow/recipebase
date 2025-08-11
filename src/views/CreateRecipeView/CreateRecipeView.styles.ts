import { SafeAreaView as OriginalSafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const SafeAreaView = styled(OriginalSafeAreaView)`
    flex: 1;
    background: ${({ theme }) => theme.palette.background[0]};
`;
