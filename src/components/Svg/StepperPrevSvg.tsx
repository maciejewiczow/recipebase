import * as React from 'react';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

export const StepperPrevSvg: React.FC<SvgProps> = props => {
    const theme = useTheme();

    return (
        <Svg
            width={81}
            height={80}
            viewBox="0 0 81 80"
            fill="none"
            {...props}
        >
            <Rect
                x={1}
                y={0.5}
                width={79}
                height={79}
                rx={39.5}
                fill={theme.palette.background[1]}
            />
            <Rect
                x={1}
                y={0.5}
                width={79}
                height={79}
                rx={39.5}
                stroke={theme.palette.text[0]}
            />
            <Path
                d="M57.12 40.5H23.87m0 0l16.625 16.625M23.87 40.5l16.625-16.625"
                stroke={theme.palette.text[0]}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};
