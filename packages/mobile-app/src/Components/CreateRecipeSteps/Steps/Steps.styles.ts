import styled, { css } from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Input, Input as OriginalInput } from '../common.styles';
import { createStyledIcon } from '~/utils/createStyledIcon';
import FaIcon from 'react-native-vector-icons/FontAwesome';

export const SectionNameInputRow = styled.View`
    flex-flow: row nowrap;
    margin-bottom: 8px;
`;

export const SectionNameInput = styled(OriginalInput)`
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

export const RecipeSectionWrapper = styled.View`
    margin-bottom: 8px;
`;

export const RecipeStepWrapper = styled.View`
    flex-flow: row nowrap;
`;

export const DragIcon = createStyledIcon(MaterialIcon, {
    name: 'drag-handle',
    color: 'black',
    size: 30,
}, css`
    text-align: center;
    text-align-vertical: center;
`);

export const RecipeStepInput = styled(Input)`
    flex-grow: 1;
    max-width: 100%;
`;
