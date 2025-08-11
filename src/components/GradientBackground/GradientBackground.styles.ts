import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { iconOffsetPx } from '../Stepper/Stepper.styles';

export const FullSizeScrollView = styled(ScrollView).attrs(({ contentContainerStyle }) => ({
    contentContainerStyle: [
        {
            paddingBottom: iconOffsetPx + 50,
        },
        contentContainerStyle,
    ],
}))`
    flex: 1;
`;

export const GradientBackground = styled(LinearGradient).attrs(({ theme }) => ({
    colors: [theme.palette.background[5], theme.palette.background[6]],
}))`
    flex: 1;
` as React.FC<Omit<LinearGradientProps, 'colors'>>;
