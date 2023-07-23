import styled, { css } from 'styled-components/native';
import { Input as OriginalInput } from '~/components/Input';
import { Button } from '../Button';
import { createStyledIcon } from '~/utils/createStyledIcon';
import FaIcon from 'react-native-vector-icons/FontAwesome';

export const StepWrapper = styled.View`
    flex: 1;
    padding: 12px;
`;

export const ScrollableStepWrapper = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexGrow: 1,
    },
})`
    flex: 1;
    padding: 12px;
`;

export const Input = styled(OriginalInput).attrs({
    inputStyle: {
        backgroundColor: 'white',
    },
})`
    margin-bottom: 12px;
`;

export const SectionHeader = styled.Text`
    margin-bottom: 18px;
    font-size: 20px;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.primaryAccent};
`;

export const AddSectionButton = styled(Button).attrs({
    variant: 'secondary',
})`
    margin-top: 4px;
`;

export const SectionNameInputRow = styled.View`
    flex-flow: row nowrap;
    margin-bottom: 8px;
`;

export const SectionNameInput = styled(Input)`
    flex-grow: 1;
    max-width: 77.5%;
    margin-bottom: 0;
`;

export const DeleteSectionIcon = createStyledIcon(FaIcon, {
    name: 'trash',
    color: 'black',
    size: 30,
}, css`
    width: 70px;
    text-align: center;
    text-align-vertical: center;
    margin-top: 20px;
`);
