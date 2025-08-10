import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';
import { TextBase } from '~/components/Text';
import { createStyledIcon } from '~/utils/createStyledIcon';
import { Button } from '../Button';

export const Wrapper = styled.View``;

export const Label = styled(TextBase).attrs({
    fontWeight: 'medium',
})`
    margin-bottom: 8px;
`;

export const PickImageButton = styled(Button).attrs({
    variant: 'outline',
})``;

export const Placeholder = styled(TextBase).attrs({ fontWeight: 'medium' })``;

export const PlusIcon = createStyledIcon(AntIcon, ({ theme }) => ({
    name: 'plus',
    size: 22,
    color: theme.palette.text[0],
}));

export const PickedImage = styled.Image`
    border-radius: ${({ theme }) => theme.border.radiusBig};
    width: 100%;
    height: 200px;
`;

export const ReplaceImageButton = styled(Button).attrs({
    variant: 'outline',
})``;

export const OptionsList = styled.View`
    flex-flow: row wrap;
    gap: 16px;
    padding: 8px 16px;
`;

export const OptionWrapper = styled.TouchableOpacity`
    width: 70px;
    align-items: center;
`;

export const OptionName = styled(TextBase)``;

const optionIconSize = 40;

export const GalleryIcon = createStyledIcon(FA5Icon, ({ theme }) => ({
    name: 'images',
    size: optionIconSize,
    color: theme.palette.text[0],
}));

export const ClearIcon = createStyledIcon(FAIcon, ({ theme }) => ({
    name: 'trash-o',
    size: optionIconSize,
    color: theme.palette.text[0],
}));

export const CameraIcon = createStyledIcon(AntIcon, ({ theme }) => ({
    name: 'camera',
    size: optionIconSize,
    color: theme.palette.text[0],
}));

export const CropIcon = createStyledIcon(EntypoIcon, ({ theme }) => ({
    name: 'crop',
    size: optionIconSize,
    color: theme.palette.text[0],
}));
