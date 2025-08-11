import { NestableDraggableFlatList, NestableScrollContainer } from 'react-native-draggable-flatlist';
import EntypoIcon from '@react-native-vector-icons/entypo';
import MaterialIcon from '@react-native-vector-icons/material-icons';
import { css, styled } from 'styled-components/native';
import { Input as OriginalInput } from '~/components/Input';
import { createStyledIcon } from '~/utils/createStyledIcon';
import { Button } from '../Button';
import { GradientBackground, ScrollableGradientBackground } from '../GradientBackground';
import { PlusIconSvg } from '../Svg/PlusIconSvg';
import { TrashIconSvg } from '../Svg/TrashIconSvg';
import { TextBase } from '../Text';
import { iconOffsetPx } from '../Stepper/Stepper.styles';

interface KeyboardStateProps {
    isKeyboardOpen: boolean;
}

export const draggableListStepMargin = css`
    margin-left: 16px;
    margin-right: 16px;
`;

const containerPadding = css`
    padding: 30px 19px;
`;

export const StepWrapper = styled(GradientBackground)`
    flex: 1;
    ${containerPadding}
    padding-bottom: 24px;
`;

export const ScrollableStepWrapper = styled(ScrollableGradientBackground).attrs<KeyboardStateProps>(
    ({ isKeyboardOpen, contentContainerStyle }) => ({
        contentContainerStyle: [
            contentContainerStyle,
            {
                paddingBottom: (isKeyboardOpen ? 0 : iconOffsetPx) + 18,
            },
        ],
    }),
)`
    ${containerPadding}
    padding-bottom: 0;
`;

export const NestableScrollableStepWrapper = styled(NestableScrollContainer).attrs<KeyboardStateProps>(
    ({ isKeyboardOpen }) => ({
        contentContainerStyle: {
            paddingBottom: (isKeyboardOpen ? 0 : iconOffsetPx) + 18,
        },
    }),
)`
    flex: 1;
`;

export const ListBottomSection = styled.View`
    border: 0 solid ${({ theme }) => theme.palette.text[1]};
    border-bottom-width: 1px;
    margin-bottom: 22px;
`;

export const Input = styled(OriginalInput)`
    margin-bottom: 12px;
    max-height: 60%;
`;

export const StepHeaderText = styled(TextBase).attrs({
    fontWeight: 'semiBold',
    size: 'lg',
})`
    line-height: ${({ theme }) => theme.text.normal.lineHeight.md};
    color: ${({ theme }) => theme.palette.primary[0]};
`;

export const StepHeaderWrapper = styled.View`
    border: 0 solid rgba(0, 0, 0, 0.15);
    border-bottom-width: 1px;
    margin-bottom: 32px;
    padding-bottom: 20px;
    flex-direction: row;
`;

export const AddSectionButtonWrapper = styled.View`
    ${draggableListStepMargin}
    margin-top: 6px;
    padding-top: 32px;
    border: 0 solid rgba(0, 0, 0, 0.15);
    border-top-width: 1px;
`;

export const AddSectionButton = styled(Button).attrs({
    variant: 'outline',
})``;

export const SectionNameInputRow = styled.View`
    flex-flow: row nowrap;
    justify-content: stretch;
    margin-bottom: 6px;
`;

export const SectionNameInput = styled(Input)`
    flex: 1;
`;

export const DraggableList = styled(NestableDraggableFlatList).attrs<{ hasMoreThanOneSection: boolean }>(
    ({ data, hasMoreThanOneSection }) => ({
        contentContainerStyle: {
            paddingTop: data.length > 0 && !hasMoreThanOneSection ? 24 : 0,
        },
    }),
)`
    margin: 0;
` as typeof NestableDraggableFlatList;

export const DeleteSectionIconWrapper = styled.TouchableOpacity`
    justify-content: flex-end;
    padding-bottom: 32px;
    padding-right: 9px;
    padding-left: 24px;
`;

export const DeleteSectionIcon = styled(TrashIconSvg)``;

export const EditIcon = createStyledIcon(
    EntypoIcon,
    {
        name: 'dots-three-vertical',
        size: 18,
    },
    css`
        vertical-align: middle;
        color: ${({ theme }) => theme.palette.text[0]};
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
        color: ${({ theme }) => theme.palette.text[7]};
    `,
);

export const DragHandleWrapper = styled.TouchableOpacity``;

export const EditIconWrapper = styled.TouchableOpacity`
    align-items: center;
`;

export const MenuItemWrapper = styled.View`
    padding: 8px 8px;
`;

export const MenuItemText = styled(TextBase).attrs({
    size: 'sm',
})``;

export const DraggableListItemWrapper = styled.View`
    ${draggableListStepMargin}
    margin-bottom: 10px;
`;

export const StepHeaderWrapperWithMargin = styled(StepHeaderWrapper)`
    margin-top: 30px;
    margin-bottom: 4px;
    ${draggableListStepMargin}
`;

export const StepHeaderBackIconWrapper = styled.TouchableOpacity`
    padding-left: 12px;
    padding-right: 24px;
    position: relative;
    top: 3px;
`;

export const AddListItemButtonIcon = styled(PlusIconSvg)`
    margin-right: 4px;
`;

export const AddListItemButton = styled(Button).attrs({
    variant: 'transparent',
    leftIcon: <AddListItemButtonIcon />,
})`
    ${draggableListStepMargin}
    align-items: center;
    justify-content: flex-start;
    padding-left: 0;
`;

export const AddListItemButtonText = styled(TextBase).attrs({
    fontWeight: 'bold',
})``;

export const SectionSeparator = styled.View`
    border: 0 solid ${({ theme }) => theme.palette.text[1]};
    border-bottom-width: 1px;
    margin-top: 12px;
    margin-bottom: 24px;
`;
