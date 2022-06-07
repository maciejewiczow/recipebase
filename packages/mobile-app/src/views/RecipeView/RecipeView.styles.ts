import styled, { css } from 'styled-components/native';
import { ImageBackground } from 'react-native';
import { Button, ButtonVariant } from 'recipebase/src/components/Button';

export const ViewWrapper = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'center',
    },
})`
    flex: 1;
`;

export const Background = styled.ImageBackground`
    height: 250px;
` as unknown as typeof ImageBackground;

export const ContentWrapper = styled.View`
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
    font-size: 24px;
    font-weight: 500;
`;

export const Text = styled.Text`
    color: #666;
`;

export const BottomBarWrapper = styled.View`
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

