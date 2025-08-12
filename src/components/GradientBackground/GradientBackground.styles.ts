import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';
import { SafeAreaView as OriginalSafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const FullSizeScrollView = styled.ScrollView``;

export const GradientBackground = styled(LinearGradient).attrs(({ theme }) => ({
    colors: [theme.palette.background[5], theme.palette.background[6]],
}))`
    flex: 1;
` as React.FC<Omit<LinearGradientProps, 'colors'>>;

export const SafeAreaView = styled(OriginalSafeAreaView)`
    flex: 1;
`;
