import React from 'react';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';

export const CreateRecipeIconSvg: React.FC<SvgProps> = ({ fill, ...props }) => (
    <Svg
        width={64}
        height={64}
        viewBox="0 0 64 64"
        fill="none"
        {...props}
    >
        <Rect
            width={64}
            height={64}
            rx={32}
            fill="#202121"
        />
        <Path
            d="M32 13.333v37.334M13.333 32h37.334"
            stroke="#FFE4D3"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);
