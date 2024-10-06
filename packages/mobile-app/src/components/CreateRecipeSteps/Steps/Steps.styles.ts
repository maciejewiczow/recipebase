import styled, { css } from 'styled-components/native';
import { Button } from '~/components/Button';
import { RecipeSectionHeader } from './RecipeSectionHeader';

const allMargin = css`
    margin-left: 16px;
    margin-right: 16px;
`;

export const RecipeSectionHeaderWithMargin = styled(RecipeSectionHeader)`
    ${allMargin}
`;

export const RecipeStepWrapper = styled.View`
    flex-flow: row nowrap;
    gap: 12px;
`;

export const AddStepButton = styled(Button).attrs({
    variant: 'transparent',
})`
    ${allMargin}
`;

export const StepPreviewText = styled.Text.attrs({
    numberOfLines: 1,
})`
    color: #444;
    font-size: 16px;
    flex: 1;
`;
