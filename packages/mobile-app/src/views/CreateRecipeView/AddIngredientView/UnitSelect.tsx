import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import invariant from 'tiny-invariant';
import { BottomSheetSelectProps } from '~/components/BottomSheetSelect/BottomSheetSelect';
import { useRootStore } from '~/RootStoreContext';
import { useRunCancellablePromise } from '~/utils/useRunCancellablePromise';
import { UnitListItemType, useUnitSelectData } from './hooks';
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
            {item.unitName}
        </UnitName>
    </UnitItemWrapper>
);

const isUnitEqual = (a: UnitListItemType, b: UnitListItemType) => a.unitName === b.unitName;

export const UnitSelect: React.FC = observer(() => {
    const { draftIngredient, units } = useRootStore();
    const [data, unitsWithDrafts] = useUnitSelectData();

    useRunCancellablePromise(
        () => units.fetchUnits(draftIngredient.unitSearchString ?? ''),
        [draftIngredient.unitSearchString, units],
    );

    const renderValue: BottomSheetSelectProps<UnitListItemType>['renderValue'] = useCallback(
        item => item.unitName,
        [],
    );

    const value = useMemo<UnitListItemType>(
        () => ({
            unitName: draftIngredient.unit.name,
            isCustom: false,
        }),
        [draftIngredient.unit.name],
    );

    const onChange: Defined<BottomSheetSelectProps<UnitListItemType>['onChange']> = useCallback(
        ({ item }) => {
            if (item.isCustom) {
                draftIngredient.setUnitName(item.unitName);
            } else {
                const unit = unitsWithDrafts.find(u => u.name === item.unitName);

                invariant(!!unit, `Unit ${item.unitName} does not exist`);

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
            renderValue={renderValue}
            isEqual={isUnitEqual}
            value={value}
            onChange={onChange}
            searchText={draftIngredient.unitSearchString}
            onSearchTextChange={draftIngredient.setUnitSearchString}
        />
    );
});
