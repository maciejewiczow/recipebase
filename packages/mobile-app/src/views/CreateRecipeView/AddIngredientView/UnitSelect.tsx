import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import invariant from 'tiny-invariant';
import { BottomSheetSelectProps } from '~/components/BottomSheetSelect/BottomSheetSelect';
import { useRootStore } from '~/RootStoreContext';
import { useRunCancellablePromise } from '~/utils/useRunCancellablePromise';
import { UnitListItemType, useUnitSelectData, useUnitsWithDrafts } from './hooks';
import { UnitItemWrapper, UnitName, UnitSelectInput as UnitSelectInput } from './AddIngredientView.styles';

const renderOption: BottomSheetSelectProps<UnitListItemType>['renderOption'] = ({
    item,
    select,
    isActive,
}) => (
    <UnitItemWrapper onPress={select}>
        <UnitName
            isCustom={item.isCustom}
            isActive={isActive}
        >
            {item.label}
        </UnitName>
    </UnitItemWrapper>
);

export const UnitSelect: React.FC = observer(() => {
    const { draftIngredient, units } = useRootStore();
    const unitsWithDrafts = useUnitsWithDrafts();
    const data = useUnitSelectData(unitsWithDrafts);

    useRunCancellablePromise(
        () => units.fetchUnits(draftIngredient.unitSearchString ?? ''),
        [draftIngredient.unitSearchString, units],
    );

    const value = useMemo<UnitListItemType>(
        () => ({
            label: draftIngredient.unit.name,
            value: draftIngredient.unit.name,
            isCustom: false,
        }),
        [draftIngredient.unit.name],
    );

    const onChange: Defined<BottomSheetSelectProps<UnitListItemType>['onChange']> = useCallback(
        ({ item }) => {
            if (item.isCustom) {
                draftIngredient.setUnitName(item.value);
            } else {
                const unit = unitsWithDrafts.find(u => u.name === item.value);

                invariant(!!unit, `Unit ${item.value} does not exist`);

                draftIngredient.setUnit(unit);
            }

            draftIngredient.commitSelectedUnit();
        },
        [draftIngredient, unitsWithDrafts],
    );

    return (
        <UnitSelectInput<UnitListItemType>
            label="Unit"
            placeholder="kg, g..."
            options={data}
            renderOption={renderOption}
            value={value}
            onChange={onChange}
            searchable
            searchText={draftIngredient.unitSearchString}
            onSearchTextChange={draftIngredient.setUnitSearchString}
        />
    );
});
