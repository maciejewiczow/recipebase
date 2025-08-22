import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

export const CloseViewIcon: React.FC<SvgProps> = props => {
    const theme = useTheme();

    return (
        <Svg
            width={32}
            height={32}
            style={{ position: 'relative', bottom: 8, right: 4 }}
            viewBox="0 0 32 32"
            fill="none"
            {...props}
        >
            <Path
                d="M25.707 24.293a1 1 0 01-1.415 1.415L16 17.414l-8.292 8.294a1 1 0 01-1.415-1.415L14.586 16 6.293 7.708a1 1 0 111.415-1.415L16 14.586l8.293-8.293a1 1 0 111.415 1.415L17.413 16l8.293 8.293z"
                fill={theme.palette.text[0]}
            />
        </Svg>
    );
};
