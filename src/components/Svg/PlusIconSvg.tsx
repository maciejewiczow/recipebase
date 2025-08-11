import React from 'react';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

export const PlusIconSvg: React.FC<SvgProps> = props => {
    const theme = useTheme();

    return (
        <Svg
            width={44}
            height={44}
            viewBox="0 0 44 44"
            fill="none"
            {...props}
        >
            <Rect
                x={0.5}
                y={0.5}
                width={43}
                height={43}
                rx={21.5}
                stroke={theme.palette.text[0]}
            />
            <Path
                d="M22 9.167v25.666M9.167 22h25.666"
                stroke={theme.palette.text[0]}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};
