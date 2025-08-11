import styled from 'styled-components/native';
import { GradientBackground } from '~/components/GradientBackground';
import { ByIngredientIconSvg } from '~/components/Svg/ByIngredientIconSvg';
import { TextBase } from '~/components/Text';
import { createViewIcon } from '../createViewIcon';

export const Wrapper = styled(GradientBackground)`
    align-items: center;
    justify-content: center;
`;

export const Text = styled(TextBase)``;

export const SearchByIngredientIcon = createViewIcon(ByIngredientIconSvg)``;
