import styled from 'styled-components/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { createViewIcon } from '../createViewIcon';
import { Input as OriginalInput } from '~/components/Input';
import { ImageInput as OriginalImageInput } from '~/components/ImageInput';
import { Button, ButtonVariant } from '~/components/Button';
import { NestableScrollContainer } from 'react-native-draggable-flatlist';

export const CreateIcon = createViewIcon(IonIcon, 'add-circle')``;

export const Wrapper = styled(NestableScrollContainer).attrs({
    contentContainerStyle: {
        flexGrow: 1,
        paddingBottom: 50,
    },
})`
    padding: 24px 28px;
    background: white;
`;

export const Text = styled.Text`
    color: #666;
`;

export const HeroText = styled.Text`
    color: ${({ theme }) => theme.palette.primaryAccent};
    font-size: 38px;
    font-weight: bold;
    margin-bottom: 36px;
`;

export const LineWrapper = styled.View`
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    margin: 24px 0;
`;

export const HorizontalLine = styled.View`
    height: 0;
    border-bottom-color: #ccc;
    border-bottom-width: 1px;
    flex-grow: 1;
    flex-shrink: 0;
    margin: 0 24px;
    margin-top: 5px;
`;

export const OrText = styled.Text`
    font-size: 24px;
    color: #717171;
`;

export const Input = styled(OriginalInput)`
    margin-bottom: 12px;
`;

export const ImageInput = styled(OriginalImageInput)`
    margin-bottom: 12px;
`;

export const ElevationWrapper = styled.View`
    elevation: -1;
    z-index: -1;
    background: transparent;
`;

export const SectionHeader = styled.Text`
    margin-top: 22px;
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: 300;
    color: ${({ theme }) => theme.palette.primaryAccent};
`;

export const RecipeIngredientWrapper = styled.View`
    flex-flow: row nowrap;
    margin-bottom: 8px;
`;

export const IngredientNameInput = styled(OriginalInput)`
    margin-right: 12px;
    flex-grow: 1;
    max-width: 66.5%;
`;

export const IngredientQuantityInput = styled(OriginalInput)`
    width: 90px;
`;

export const AddSectionButton = styled(Button).attrs({
    variant: ButtonVariant.secondary,
})`
    margin-top: 4px;
`;

export const IngredientSectionWrapper = styled.View`
    margin-bottom: 30px;
`;

export const SectionNameInputRow = styled.View`
    flex-flow: row nowrap;
    margin-bottom: 8px;
`;

export const SectionNameInput = styled(OriginalInput)`
    flex-grow: 1;
    max-width: 77.5%;
`;

export const DeleteSectionIcon = styled(FaIcon).attrs({
    name: 'trash',
    color: 'black',
    size: 30,
})`
    width: 70px;
    text-align: center;
    text-align-vertical: center;
    margin-top: 20px;
`;

export const RecipeSectionWrapper = styled.View`
    margin-bottom: 8px;
`;

export const RecipeStepWrapper = styled.View`
    flex-flow: row nowrap;
`;

export const DragIcon = styled(MaterialIcon).attrs({
    name: 'drag-handle',
    color: 'black',
    size: 30,
})`
    text-align: center;
    text-align-vertical: center;
`;

export const RecipeStepInput = styled(Input)`
    flex-grow: 1;
    max-width: 100%;
`;

export const SaveButton = styled(Button)`
    margin-top: 28px;
`;
