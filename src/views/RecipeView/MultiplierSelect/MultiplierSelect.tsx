import React, { useEffect, useMemo, useState } from 'react';
import { uniqBy } from 'lodash';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '~/RootStoreContext';
import { optionalArrayItem } from '~/utils/optionalArrayItem';
import { ChevronDown, Select } from './MultiplierSelect.styles';

interface MultiplierDropdownItem {
    label: string;
    value: number | string;
    isCustom: boolean;
}

const initialDropdownItems: MultiplierDropdownItem[] = [
    ...Array.from({ length: 2 / 0.25 }).map((_, i) => ({
        label: `x${(i + 1) * 0.25}`,
        value: (i + 1) * 0.25,
        isCustom: false,
    })),
    ...Array.from({ length: 8 })
        .fill(0)
        .map((_, i) => ({
            label: `x${i + 3}`,
            value: i + 3,
            isCustom: false,
        })),
];

export const MultiplierSelect: React.FC = observer(() => {
    const { currentRecipe } = useRootStore();
    const [inputText, setInputText] = useState('');
    const [customMultipler, setCustomMultipler] = useState(currentRecipe.ingredientMultiplier);

    useEffect(() => {
        if (inputText && !isNaN(parseFloat(inputText))) {
            setCustomMultipler(parseFloat(inputText));
        }
    }, [inputText]);

    const options = useMemo<MultiplierDropdownItem[]>(
        () =>
            uniqBy(
                [
                    ...optionalArrayItem(
                        customMultipler && {
                            label: `x${customMultipler}`,
                            value: customMultipler,
                            isCustom: true,
                        },
                    ),
                    ...initialDropdownItems,
                ],
                ({ value }) => value,
            ),
        [customMultipler],
    );

    return (
        <Select<MultiplierDropdownItem>
            value={options.find(({ value }) => value === currentRecipe.ingredientMultiplier)}
            onChange={({ item: { value } }) => {
                currentRecipe.setIngredientMultiplier(+value);
            }}
            searchText={inputText}
            onSearchTextChange={setInputText}
            options={options}
            iconRight={<ChevronDown />}
            searchable
            noSetSearchTextToCurrentValue
        />
    );
});

MultiplierSelect.displayName = 'MultiplierSelect';
