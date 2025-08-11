import React from 'react';
import Svg, { Circle, SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

export const DotSvg: React.FC<SvgProps> = props => {
    const theme = useTheme();

    return (
        <Svg
            width={4}
            height={4}
            viewBox="0 0 4 4"
            fill="none"
            {...props}
        >
            <Circle
                cx={2}
                cy={2}
                r={2}
                fill={theme.palette.primary[1]}
            />
        </Svg>
    );
};
