import styled, { css } from 'styled-components/native';
import { AddSectionButton as OriginalAddSectionButton, Input as OriginalInput, StepHeader as OriginalStepHeader } from '../common.styles';
import { createStyledIcon } from '~/utils/createStyledIcon';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { NestableDraggableFlatList, NestableScrollContainer } from 'react-native-draggable-flatlist';
import { Button } from '~/components/Button';
import { SectionHeader } from './SectionHeader';

const allMargin = css`
    margin-left: 16px;
    margin-right: 16px;
`;

export const ScrollableStepWrapper = styled(NestableScrollContainer)`
    flex: 1;
`;

export const SectionHeaderWithMargin = styled(SectionHeader)`
    ${allMargin}
`;

export const IngredientList = styled(NestableDraggableFlatList)`
    margin: 0;
` as typeof NestableDraggableFlatList;

export const StepHeader = styled(OriginalStepHeader)`
    margin-top: 16px;
    ${allMargin}
`;

export const AddSectionButton = styled(OriginalAddSectionButton)`
    ${allMargin}
`;

export const AddIngredientButton = styled(Button).attrs({
    variant: 'transparent',
})`
    ${allMargin}
`;

export const ListItemWrapper = styled.View`
    background: #f3f0f1;
    padding: 8px 16px;
`;

export const RecipeIngredientWrapper = styled.View`
    flex-flow: row nowrap;
    margin-bottom: 10px;
`;

export const IngredientNameWrapper = styled.View`
    flex: 4;
`;

export const DragHandleWrapper = styled.TouchableOpacity`
    flex: 1;
`;

export const DragHandleIcon = createStyledIcon(MaterialIcon, {
    name: 'drag-handle',
    size: 25,
}, css`
    vertical-align: middle;
    color: #555;
`);

export const EditIconWrapper = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
`;

export const EditIcon = createStyledIcon(EntypoIcon, {
    name: 'dots-three-vertical',
    size: 16,
}, css`
    vertical-align: middle;
    color: #555;
`);

export const AddIcon = createStyledIcon(EntypoIcon, {
    name: 'plus',
    size: 20,
    color: '#333',
});

export const QuantityWrapper = styled.View`
    flex: 3;
`;

export const Text = styled.Text`
    color: #555;
    font-size: 16px;
`;

export const IngredientNameInput = styled(OriginalInput)`
    margin-right: 12px;
    flex-grow: 1;
    max-width: 66.5%;
    margin-bottom: 0;
`;

export const IngredientQuantityInput = styled(OriginalInput)`
    width: 90px;
    margin-bottom: 0;
`;

export const IngredientSectionWrapper = styled.View`
    margin-bottom: 30px;
`;


