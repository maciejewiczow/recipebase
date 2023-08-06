import { css, styled } from 'styled-components/native';
import { BottomSheetSelect } from '~/components/BottomSheetSelect/BottomSheetSelect';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';

export const IngredientNameInput = styled(Input)`
    margin-bottom: 12px;
`;

export const ListItemWrapper = styled.TouchableOpacity`
    padding: 12px 0;
    flex: 1;
    height: 50px;
`;

export const StoredIngredientName = styled.Text<{ isCustomItem: boolean }>`
    color: #444;
    font-size: 16px;
    ${({ isCustomItem }) => isCustomItem && css`
        font-style: italic;
    `}
`;

export const SaveButton = styled(Button).attrs({
    variant: 'primary',
})``;

export const InputsRow = styled.View`
    flex-flow: row nowrap;
    gap: 10px;
    flex: 1;
`;

export const QuantityInput = styled(Input)`
    flex: 1;
`;

export const UnitSelectInput = styled(BottomSheetSelect)`
    flex: 1;
` as typeof BottomSheetSelect;

export const UnitItemWrapper = styled.TouchableOpacity`
    padding: 8px 0;
`;

export const UnitName = styled.Text<{ isCustom: boolean; isActive: boolean }>`
    font-size: 16px;
    ${({ isCustom }) => isCustom && css`
        font-style: italic;
    `}
    color: ${({ isActive }) => (isActive ? '#333' : '#777')}
`;
