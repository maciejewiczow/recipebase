import { IconProps } from '@react-native-vector-icons/common';
import styled, { DefaultTheme } from 'styled-components/native';
import { RuleSet } from 'styled-components/native/dist/types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const createStyledIcon = <
    TIconName extends string,
    T extends IconProps<TIconName>,
    Props extends object,
>(
    icon: React.ComponentType<IconProps<TIconName>>,
    presetProps: T | ((params: { theme: DefaultTheme }) => T),
    css?: RuleSet<Props>,
) =>
    styled(icon).attrs(presetProps)`
        ${css as any}
    ` as React.FC<Omit<IconProps<TIconName>, keyof T>>;
/* eslint-enable @typescript-eslint/no-explicit-any */
