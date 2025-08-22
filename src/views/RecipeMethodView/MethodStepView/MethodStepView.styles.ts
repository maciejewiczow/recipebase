import styled, { css } from 'styled-components/native';
import { StepWrapper } from '~/components/CreateRecipeSteps/common.styles';
import { TextBase } from '~/components/Text';

export const Wrapper = styled(StepWrapper)<{ hasSectionName: boolean }>`
    flex: 1;
    gap: 24px;
    ${({ hasSectionName }) =>
        hasSectionName &&
        css`
            padding-top: 12px;
        `}
`;

export const StepPhoto = styled.Image`
    object-fit: cover;
    height: 225px;
    border-radius: ${({ theme }) => theme.border.radiusGigantic};
`;

export const IngredientListWrapper = styled.View`
    flex-flow: row wrap;
    padding-bottom: 16px;

    border: 0 solid ${({ theme }) => theme.palette.text[0]};
    border-bottom-width: 1px;

    gap: 12px;
`;

export const SectionName = styled(TextBase).attrs({
    size: 'lg',
})``;

export const IngredientName = styled(TextBase).attrs({
    size: 'md',
    fontWeight: 'bold',
})``;

export const TextWrapper = styled.Text`
    max-width: 100%;
`;

export const UnitText = styled(TextBase).attrs({
    size: 'md',
    fontWeight: 'regular',
})``;

export const IngredientWrapper = styled.View`
    flex-direction: row;
`;

export const StepText = styled(TextBase).attrs({
    size: 'md',
    fontWeight: 'medium',
})``;
