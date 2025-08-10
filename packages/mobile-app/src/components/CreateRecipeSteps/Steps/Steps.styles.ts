import styled, { css } from 'styled-components/native';
import { TextBase } from '~/components/Text';
import { ListItemMenu as OriginalListItemMenu } from '../ListItemMenu';
import { AddStepButton as OriginalAddStepButton } from './AddStepButton';
import { RecipeSectionHeader } from './RecipeSectionHeader';

const allMargin = css`
    margin-left: 16px;
    margin-right: 16px;
`;

export const FirstRecipeSectionHeader = styled(RecipeSectionHeader)`
    ${allMargin}
    margin-top: 18px;
`;

export const RecipeStepWrapper = styled.View`
    flex-flow: row nowrap;
    gap: 12px;
    padding: 12px 8px;
    align-items: flex-start;
    background: ${({ theme }) => theme.palette.background[3]};
    border-radius: ${({ theme }) => theme.border.radius};
`;

export const StepPreviewText = styled(TextBase).attrs({
    numberOfLines: 3,
    fontWeight: 'medium',
})`
    max-width: 90%;
`;

export const StepPreviewTextWrapper = styled.View`
    flex: 1;
    gap: 8px;
`;

export const ListItemMenu = styled(OriginalListItemMenu)`
    padding-top: 4px;
    padding-right: 2px;
`;

export const AddStepButton = styled(OriginalAddStepButton)`
    margin-left: 0;
    margin-right: 0;
`;
