import React, { useCallback, useEffect, useMemo } from 'react';
import { BottomSheetSelectProps } from '~/components/BottomSheetSelect/BottomSheetSelect';
import { UnitItemWrapper, UnitName, UnitSelectInput as UnitSelectInput } from './AddIngredientView.styles';
import { useRootStore } from '~/RootStoreContext';
import { observer } from 'mobx-react-lite';
import invariant from 'tiny-invariant';
import { catchCancelledFlow } from '~/utils/catchCancelledFlow';

interface UnitListItemType {
    unitName: string;
    isCustom: boolean;
}

export const UnitSelect: React.FC = observer(() => {
    const { draftIngredient, units } = useRootStore();

    useEffect(() => {
        const promise = units.fetchUnits(draftIngredient.unitSearchString ?? '');

        promise.catch(catchCancelledFlow);

        return () => promise.cancel();
    }, [draftIngredient.unitSearchString, units]);

    const renderOption: BottomSheetSelectProps<UnitListItemType>['renderOption'] = useCallback(
        ({ item, select, isActive }) => (
            <UnitItemWrapper onPress={select}>
                <UnitName
                    isCustom={item.isCustom}
                    isActive={isActive}
                >
                    {item.unitName}
                </UnitName>
            </UnitItemWrapper>
        ),
        [],
    );

    const renderValue: BottomSheetSelectProps<UnitListItemType>['renderValue'] = useCallback(
        item => item.unitName,
        [],
    );

    const isEqual = useCallback((a: UnitListItemType, b: UnitListItemType) => a.unitName === b.unitName, []);

    const data = useMemo<UnitListItemType[]>(
        () => [
            ...(draftIngredient.unitSearchString &&
            !units.units.some(u => u.name === draftIngredient.unitSearchString)
                ? [
                      {
                          unitName: draftIngredient.unitSearchString,
                          isCustom: true,
                      },
                  ]
                : []),
            ...units.units.map(unit => ({
                unitName: unit.name,
                isCustom: false,
            })),
        ],
        [draftIngredient.unitSearchString, units.units],
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
                const unit = units.units.find(u => u.name === item.unitName);

                invariant(!!unit, `Unit ${item.unitName} does not exist`);

                draftIngredient.setUnit(unit);
            }

            draftIngredient.commitSelectedUnit();
        },
        [draftIngredient, units.units],
    );

    return (
        <UnitSelectInput<UnitListItemType>
            label="Unit"
            placeholder="kg, g..."
            options={data}
            renderOption={renderOption}
            renderValue={renderValue}
            isEqual={isEqual}
            value={value}
            onChange={onChange}
            searchText={draftIngredient.unitSearchString}
            onSearchTextChange={draftIngredient.setUnitSearchString}
        />
    );
});
