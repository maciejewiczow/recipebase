import React from 'react';
import { SvgProps } from 'react-native-svg';
import styled from 'styled-components/native';

export interface ViewIconProps {
    focused?: boolean;
}

export const createViewIcon = (icon: React.FC<SvgProps>) =>
    styled(icon).attrs<ViewIconProps>(({ focused, theme }) => ({
        fill: focused ? theme.palette.primary[2] : theme.palette.text[0],
    }));
