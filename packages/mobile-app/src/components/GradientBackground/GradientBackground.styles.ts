import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export const GradientBackground = styled(LinearGradient).attrs(({ theme }) => ({
    colors: [theme.palette.background[5], theme.palette.background[6]],
}))`
    flex: 1;
` as React.FC<Omit<LinearGradientProps, 'colors'>>;
