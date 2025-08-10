import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

export const TrashIconSvg: React.FC<SvgProps> = props => {
    const theme = useTheme();

    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <Path
                d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                stroke={theme.palette.text[0]}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};
