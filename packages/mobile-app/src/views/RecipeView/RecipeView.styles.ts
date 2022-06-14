import styled, { css } from 'styled-components/native';
import { ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Entypo';
import { Button, ButtonVariant } from 'recipebase/src/components/Button';

export const ScrollWrapper = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'center',
    },
})`
    flex: 1;
`;

export const Wrapper = styled.View`
    flex: 1;
`;

export const Background = styled.ImageBackground`
    height: 250px;
` as unknown as typeof ImageBackground;

export const BackIconWrapper = styled.TouchableOpacity`
    padding: 24px;
    position: absolute;
    top: 0;
    left: 0;
`;

export const BackIcon = styled(Icon).attrs({
    name: 'chevron-thin-left',
    color: 'white',
    size: 20,
})``;

export const MenuIcon = styled(Icon).attrs({
    name: 'dots-three-horizontal',
    color: 'white',
    size: 20,
})``;

export const MenuIconWrapper = styled.TouchableOpacity`
    padding: 24px;
    position: absolute;
    top: 0;
    right: 0;
`;

export const Text = styled.Text`
    color: #666;
`;

export const SectionTitle = styled.Text<{ isFirstChild?: boolean }>`
    color: #777;
    font-size: 16px;
    margin-bottom: 8px;
    ${({ isFirstChild }) => !isFirstChild && css`
        margin-top: 12px;
    `}
`;

export const Content = styled.View`
    flex: 1;
    position: relative;
    margin-top: -30px;
    border-top-left-radius: ${({ theme }) => theme.border.radiusGigantic};
    border-top-right-radius: ${({ theme }) => theme.border.radiusGigantic};
    background: white;
    padding: 24px 24px;
`;

export const RecipeName = styled.Text`
    color: black;
    font-size: 26px;
    font-weight: 500;
`;

export const Description = styled.Text`
    color: #545454;
    font-size: 12px;
`;

export const BottomBar = styled.View`
    height: 75px;
    padding: 12px 24px;
    align-items: center;
    justify-content: center;
    flex-flow: row nowrap;
    background: white;
`;

const ButtonStyles = css`
    height: 100%;
    padding: 0;
    justify-content: center;
`;

export const LeftButton = styled(Button).attrs({
    variant: ButtonVariant.secondary,
})`
    flex: 1;
    margin-right: 12px;
    ${ButtonStyles}
`;

export const RightButton = styled(Button).attrs({
    variant: ButtonVariant.primary,
})`
    flex: 3;
    ${ButtonStyles}
`;

export const IngredientsHeader = styled.View`
    flex-flow: row nowrap;
    align-items: center;
    margin-top: 18px;
`;

export const SubHeaderText = styled.Text`
    font-size: 20px;
    color: black;
    flex: 3;
`;

export const IngredientMultiplierPicker = styled(DropDownPicker).attrs({
    searchContainerStyle: {
        padding: 0,
    },
    containerStyle: {
        width: 90,
    },
    textStyle: {
        color: '#575757',
    },
    searchTextInputStyle: {
        borderWidth: 0,
        borderRadius: 0,
    },
    dropDownContainerStyle: {
        borderColor: '#ccc',
    },
})`
    border-color: #ccc;
`;

export const Ingredients = styled.View`
    margin-top: 12px;
    margin-bottom: 18px;
`;

export const IngredientRow = styled.View`
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 4px;
`;

export const IngredientText = styled.Text`
    color: #4B4B4B;
    font-size: 17px;
`;

export const StepsHeaderText = styled.Text`
    color: black;
    font-size: 19px;
    margin-bottom: 12px;
`;

export const RecipeStepRow = styled.View`
    flex-direction: row;
    padding-left: 12px;
`;

export const RecipeStepText = styled.Text<{ isCurrent?: boolean }>`
    color: ${({ isCurrent }) => (isCurrent ? '#454545' : '#AEAEAE')};
    margin-bottom: 12px;
    margin-left: 24px;
    font-size: 15px;
    flex: 1;
`;
