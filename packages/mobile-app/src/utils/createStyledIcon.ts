import { IconProps } from 'react-native-vector-icons/Icon';
import styled, { DefaultTheme } from 'styled-components/native';
import { RuleSet } from 'styled-components/native/dist/types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const createStyledIcon = <T extends IconProps, Props extends object>(
    icon: React.ComponentType<IconProps>,
    presetProps: T | ((params: { theme: DefaultTheme }) => T),
    css?: RuleSet<Props>,
) => styled(icon).attrs(presetProps)`
        ${css as any}
    ` as React.FC<Omit<IconProps, keyof T>>;
/* eslint-enable @typescript-eslint/no-explicit-any */
