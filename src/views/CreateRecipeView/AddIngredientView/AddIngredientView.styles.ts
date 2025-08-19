import { FlatList, TouchableOpacity } from 'react-native';
import { css, styled } from 'styled-components/native';
import { BottomSheetSelect } from '~/components/BottomSheetSelect/BottomSheetSelect';
import { Button } from '~/components/Button';
import { containerPadding } from '~/components/CreateRecipeSteps/common.styles';
import { SafeAreaGradientBackground } from '~/components/GradientBackground/SafeAreaGradientBackground';
import { Input } from '~/components/Input';
import { TextBase } from '~/components/Text';

export const IngredientNameInput = styled(Input).attrs<{ hasBottomBorderRadius: boolean }>(
    ({ hasBottomBorderRadius }) => ({
        inputStyle: hasBottomBorderRadius
            ? {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  paddingBottom: 6,
              }
            : undefined,
    }),
)``;

export const Wrapper = styled(SafeAreaGradientBackground)`
    ${containerPadding}
`;

export const ListItemWrapper = styled.TouchableOpacity`
    padding: 12px 0;
    flex: 1;
    min-height: 50px;
`;

export const StoredIngredientName = styled(TextBase).attrs({
    size: 'md',
})<{ isCustomItem: boolean }>`
    ${({ isCustomItem }) =>
        isCustomItem &&
        css`
            font-style: italic;
        `}
`;

export const SaveButton = styled(Button).attrs({
    variant: 'primary',
})``;

export const InputsRow = styled.View`
    margin-top: 18px;
    flex-flow: row nowrap;
    gap: 16px;
    flex: 1;
`;

export const QuantityInput = styled(Input)`
    flex: 1;
`;

export const UnitSelectInput = styled(BottomSheetSelect)`
    flex: 1;
` as typeof BottomSheetSelect;

export const UnitItemWrapper = styled(TouchableOpacity)`
    padding: 8px 0;
`;

export const UnitName = styled(TextBase).attrs<{ isCustom: boolean; isActive: boolean; isEmpty: boolean }>({
    size: 'md',
})`
    ${({ isCustom }) =>
        isCustom &&
        css`
            font-style: italic;
        `}
    color: ${({ isActive, isEmpty }) => (isEmpty ? 'white' : isActive ? '#333' : '#777')};
`;

export const EmptyListImageWrapper = styled.View`
    gap: 24px;
`;

export const EmptyListText = styled.Text`
    font-size: 22px;
    text-align: center;
`;

const listPadding = 16;

export const IngredientListComponent = styled.FlatList.attrs({
    contentContainerStyle: {
        padding: listPadding,
        paddingTop: 0,
    },
})`
    background: ${({ theme }) => theme.palette.background[4]};
    border-radius: ${({ theme }) => `0 0 ${theme.border.radiusBig} ${theme.border.radiusBig}`};
    margin-bottom: 18px;
` as typeof FlatList;

export const ListHeaderWrapper = styled.View`
    padding: 0 ${listPadding}px;
    background: ${({ theme }) => theme.palette.background[4]};
`;

export const ListHeader = styled.View`
    border: 0 solid ${({ theme }) => theme.palette.text[8]};
    border-bottom-width: 1px;
`;

export const EmptyListPlaceholder = styled.View`
    flex: 1;
`;
