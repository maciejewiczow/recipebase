import EntypoIcon from 'react-native-vector-icons/Entypo';
import styled from 'styled-components/native';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { createStyledIcon } from '~/utils/createStyledIcon';

export const StepContentWrapper = styled.View`
    flex: 1;
    gap: 12px;
`;

export const StepContentInput = styled(Input).attrs({
    multiline: true,
    numberOfLines: 10,
})`
    width: 100%;
`;

export const AddIngredientButton = styled(Button).attrs({
    variant: 'secondary',
})``;

export const AddIcon = createStyledIcon(EntypoIcon, {
    name: 'plus',
    size: 20,
    color: '#333',
});
