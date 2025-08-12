import styled from 'styled-components/native';
import {
    AddListItemButton as OriginalAddListItemButton,
    containerPadding,
    StepHeaderWrapper as OriginalStepHeaderWrapper,
} from '~/components/CreateRecipeSteps/common.styles';
import { Input } from '~/components/Input';
import { inputStyles } from '~/components/Input/Input.styles';
import { TextBase } from '~/components/Text';

export const StepContentWrapper = styled.View`
    flex: 1;
    gap: 8px;
    margin-bottom: 24px;
`;

export const StepContentInputWrapper = styled.View`
    ${inputStyles}
    gap: 16px;
`;

export const StepContentInputRow = styled.View`
    flex-direction: row;
    gap: 12px;
`;

export const StepContentInput = styled(Input).attrs({
    multiline: true,
    numberOfLines: 12,
    inputStyle: {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
    },
})`
    min-height: 100px;
    flex: 1;
`;

export const AddListItemButton = styled(OriginalAddListItemButton)`
    margin: 0;
`;

export const StepHeaderWrapper = styled(OriginalStepHeaderWrapper)`
    margin-bottom: 8px;
`;

export const Wrapper = styled.View`
    ${containerPadding}
`;

export const StepNumberWrapper = styled.View`
    width: 33px;
    height: 33px;
    border-radius: ${33 / 2}px;
    border: 1px solid ${({ theme }) => theme.palette.text[0]};
    align-items: center;
    justify-content: center;
    padding-bottom: 4px;
`;

export const StepNumberText = styled(TextBase)``;
