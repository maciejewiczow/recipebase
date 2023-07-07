import { IconProps } from 'react-native-vector-icons/Icon';
import styled from 'styled-components/native';
import { RuleSet } from 'styled-components/native/dist/types';

export const createStyledIcon = <T extends IconProps, Props extends object>(
    icon: React.ComponentType<IconProps>,
    presetProps: T,
    css?: RuleSet<Props>
    // @ts-ignore
) => styled(icon).attrs(presetProps)`${css}` as React.FC<Omit<IconProps, keyof T>>;
