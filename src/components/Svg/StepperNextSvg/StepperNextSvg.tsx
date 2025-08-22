import * as React from 'react';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';
import { Loader, LoaderWrapper, Wrapper } from './StepperNextSvg.styles';

export const StepperNextSvg: React.FC<SvgProps & { isLoading?: boolean }> = ({
    isLoading,
    style,
    ...props
}) => {
    const theme = useTheme();

    return (
        <Wrapper style={style}>
            {isLoading && (
                <LoaderWrapper>
                    <Loader />
                </LoaderWrapper>
            )}
            <Svg
                width={81}
                height={80}
                viewBox="0 0 81 80"
                fill="none"
                {...props}
            >
                <Rect
                    width={80}
                    height={80}
                    rx={40}
                    transform="matrix(-1 0 0 1 80.5 0)"
                    fill={theme.palette.text[0]}
                />
                {!isLoading && (
                    <Path
                        d="M23.88 40.5h33.25m0 0L40.505 57.125M57.13 40.5L40.505 23.875"
                        stroke={theme.palette.background[1]}
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                )}
            </Svg>
        </Wrapper>
    );
};
