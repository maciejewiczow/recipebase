import { NestableDraggableFlatList, NestableScrollContainer } from 'react-native-draggable-flatlist';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { css, styled } from 'styled-components/native';
import { Input as OriginalInput } from '~/components/Input';
import { createStyledIcon } from '~/utils/createStyledIcon';
import { Button } from '../Button';

export const draggableListStepMargin = css`
    margin-left: 16px;
    margin-right: 16px;
`;

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

export const NestableScrollableStepWrapper = styled(NestableScrollContainer)`
    flex: 1;
`;

export const Input = styled(OriginalInput).attrs({
    inputStyle: {
        backgroundColor: 'white',
    },
})`
    margin-bottom: 12px;
    max-height: 60%;
`;

export const StepHeader = styled.Text`
    margin-bottom: 18px;
    font-size: 20px;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.primaryAccent};
`;

export const AddSectionButton = styled(Button).attrs({
    variant: 'secondary',
})`
    margin-top: 4px;
    ${draggableListStepMargin}
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

export const DeleteSectionIconWrapper = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
`;

export const DraggableList = styled(NestableDraggableFlatList)`
    margin: 0;
` as typeof NestableDraggableFlatList;

export const DeleteSectionIcon = createStyledIcon(
    FaIcon,
    {
        name: 'trash',
        color: 'black',
        size: 30,
    },
    css`
        width: 70px;
        text-align: center;
        text-align-vertical: center;
        margin-top: 20px;
    `,
);

export const AddIcon = createStyledIcon(EntypoIcon, {
    name: 'plus',
    size: 20,
    color: '#333',
});

export const EditIcon = createStyledIcon(
    EntypoIcon,
    {
        name: 'dots-three-vertical',
        size: 16,
    },
    css`
        vertical-align: middle;
        color: #555;
    `,
);

export const DragHandleIcon = createStyledIcon(
    MaterialIcon,
    {
        name: 'drag-handle',
        size: 25,
    },
    css`
        vertical-align: middle;
        color: #555;
    `,
);

export const DragHandleWrapper = styled.TouchableOpacity``;

export const EditIconWrapper = styled.TouchableOpacity`
    align-items: center;
`;

export const MenuItemWrapper = styled.View`
    padding: 8px 8px;
`;

export const MenuItemText = styled.Text`
    color: #444;
`;

export const DraggableListItemWrapper = styled.View`
    background: #f3f0f1;
    padding: 8px 16px;
`;

export const StepHeaderWithMargin = styled(StepHeader)`
    margin-top: 16px;
    ${draggableListStepMargin}
`;

export const AddListItemButton = styled(Button).attrs({
    variant: 'transparent',
})`
    ${draggableListStepMargin}
`;
