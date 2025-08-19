import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

export const BackIconSvg: React.FC<SvgProps> = props => {
    const theme = useTheme();

    return (
        <Svg
            width={48}
            height={48}
            viewBox="0 0 48 48"
            fill="none"
            {...props}
        >
            <G clipPath="url(#clip0_1_276)">
                <Rect
                    width={48}
                    height={48}
                    rx={24}
                    fill={theme.palette.background[1]}
                />
                <Path
                    d="M32 23H16m0 0l8 8m-8-8l8-8"
                    stroke={theme.palette.text[0]}
                    strokeWidth={1.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
            <Rect
                x={0.5}
                y={0.5}
                width={47}
                height={47}
                rx={23.5}
                stroke={theme.palette.text[0]}
            />
            <Defs>
                <ClipPath id="clip0_1_276">
                    <Rect
                        width={48}
                        height={48}
                        rx={24}
                        fill="#fff"
                    />
                </ClipPath>
            </Defs>
        </Svg>
    );
};
