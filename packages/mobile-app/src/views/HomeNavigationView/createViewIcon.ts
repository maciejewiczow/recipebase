import { Icon } from 'react-native-vector-icons/Icon';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';

export interface ViewIconProps {
    focused?: boolean;
}

export const createViewIcon = (
    icon: typeof Icon | typeof FA5Icon,
    name: string,
) =>
    styled(icon).attrs<{ focused: boolean }>(({ focused, theme }) => ({
        name,
        size: 30,
        color: focused ? theme.palette.primaryAccent : '#C6C6C6',
    }));
