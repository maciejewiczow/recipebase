import React, { useCallback, useEffect, useMemo } from 'react';
import { Unit } from 'backend-logic';
import { uniq } from 'lodash';
import { observer } from 'mobx-react-lite';
import invariant from 'tiny-invariant';
import { BottomSheetSelectProps } from '~/components/BottomSheetSelect/BottomSheetSelect';
import { useRootStore } from '~/RootStoreContext';
import { catchCancelledFlow } from '~/utils/catchCancelledFlow';
import { isTruthy } from '~/utils/isTruthy';
import { UnitItemWrapper, UnitName, UnitSelectInput as UnitSelectInput } from './AddIngredientView.styles';

interface UnitListItemType {
    unitName: string;
    isCustom: boolean;
}

export const UnitSelect: React.FC = observer(() => {
    const { draftIngredient, units, draftRecipe } = useRootStore();

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

    const unitsWithDrafts = useMemo<Unit[]>(
        () => [
            ...(uniq(
                draftRecipe.recipe.ingredientSections
                    ?.flatMap(is => is.recipeIngredients)
                    .filter(isTruthy)
                    .map(({ unit }) => unit)
                    .filter(isTruthy),
            ) ?? []),
            ...units.units,
        ],
        [draftRecipe.recipe.ingredientSections, units.units],
    );

    const data = useMemo<UnitListItemType[]>(
        () => [
            ...(draftIngredient.unitSearchString &&
            !unitsWithDrafts.some(x => x.name === draftIngredient.unitSearchString)
                ? [
                      {
                          unitName: draftIngredient.unitSearchString,
                          isCustom: true,
                      },
                  ]
                : []),
            ...unitsWithDrafts.map(unit => ({ unitName: unit.name, isCustom: false })),
        ],
        [draftIngredient.unitSearchString, unitsWithDrafts],
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
            isEqual={isEqual}
            value={value}
            onChange={onChange}
            searchText={draftIngredient.unitSearchString}
            onSearchTextChange={draftIngredient.setUnitSearchString}
        />
    );
});
