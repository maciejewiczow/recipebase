import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

export const TagPlusIconSvg: React.FC<SvgProps> = props => {
    const theme = useTheme();

    return (
        <Svg
            width={18}
            height={17}
            viewBox="0 0 18 17"
            fill="none"
            {...props}
        >
            <Path
                d="M9 1v15M1 9h16"
                stroke={theme.palette.background[1]}
                strokeWidth={2}
                strokeLinecap="square"
                strokeLinejoin="round"
            />
        </Svg>
    );
};
