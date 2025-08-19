import React from 'react';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

export const iconSize = 36;

export const MoreIconSvg: React.FC<SvgProps> = props => {
    const theme = useTheme();

    return (
        <Svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 36 36"
            fill="none"
            {...props}
        >
            <Rect
                width={iconSize}
                height={iconSize}
                rx={iconSize / 2}
                fill={theme.palette.background[8]}
            />
            <Path
                d="M18 12a1 1 0 100-2 1 1 0 000 2zM18 19a1 1 0 100-2 1 1 0 000 2zM18 26a1 1 0 100-2 1 1 0 000 2z"
                stroke={theme.palette.text[0]}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};
