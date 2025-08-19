import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

export const DownChevronSvg: React.FC<SvgProps> = props => {
    const theme = useTheme();

    return (
        <Svg
            width={14}
            height={8}
            viewBox="0 0 14 8"
            fill="none"
            {...props}
        >
            <Path
                d="M13 1L7 7 1 1"
                stroke={theme.palette.text[0]}
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};
