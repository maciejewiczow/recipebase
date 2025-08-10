import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const BackIconSvg: React.FC<SvgProps> = props => (
    <Svg
        width={11}
        height={20}
        viewBox="0 0 11 20"
        fill="none"
        {...props}
    >
        <Path
            d="M10 19l-9-9 9-9"
            stroke="#202121"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);
