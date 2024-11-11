import React, { ReactElement, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ListRenderItem, StyleProp, TextInput, TouchableOpacity, ViewStyle } from 'react-native';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useBottomSheetModal } from '~/utils/useBottomSheet';
import { Label } from '../Input/Input.styles';
import {
    DefaultItemText,
    DefaultItemWrapper,
    InputPressable,
    InputRow,
    ListWrapper,
    Placeholder,
    PseudoInput,
    SearchInput,
    Value,
    Wrapper,
} from './BottomSheetSelect.styles';

export interface DefaultItem {
    label: string;
    value: string;
}

interface Option<T extends DefaultItem> {
    item: T;
    isActive: boolean;
}

interface OptionWithIndex<T extends DefaultItem> extends Option<T> {
    index: number;
}

interface ListOption<T extends DefaultItem> extends OptionWithIndex<T> {
    select: () => void;
}

type RenderOption<T extends DefaultItem = DefaultItem> = (opt: ListOption<T>) => ReactElement;
type RenderValue<T extends DefaultItem = DefaultItem> = (val: T) => string | number | null | undefined;
type IsEqual<T extends DefaultItem = DefaultItem> = (a: T, b: T) => boolean;
type KeyExtractor<T extends DefaultItem = DefaultItem> = (item: T) => Stringable;

export type BottomSheetSelectProps<T extends DefaultItem> = {
    label?: string;
    placeholder?: string;
    style?: StyleProp<ViewStyle>;
    options: T[];
    renderOption?: RenderOption<T>;
    renderValue?: RenderValue<T>;
    onChange?: (opt: Option<T>) => void;
    keyExtractor?: KeyExtractor<T>;
    isEqual?: IsEqual<T>;
    value?: T;
    iconRight?: ReactNode;
} & (
    | {
          searchable: true;
          searchText?: string;
          onSearchTextChange?: (text: string) => void;
      }
    | {
          searchable?: false;
      }
);

const defaultIsEqual: IsEqual = (a, b) => a.value === b.value;

const defaultRenderOption: RenderOption = ({ select, isActive, item }: ListOption<DefaultItem>) => (
    <TouchableOpacity onPress={select}>
        <DefaultItemWrapper>
            <DefaultItemText isActive={isActive}>{item.label}</DefaultItemText>
        </DefaultItemWrapper>
    </TouchableOpacity>
);

const defaultKeyExtractor: KeyExtractor = ({ value }) => value;
const defaultRenderValue: RenderValue = ({ label }) => label;

export const BottomSheetSelect = <T extends DefaultItem = DefaultItem>({
    label,
    placeholder,
    style,
    options,
    renderOption = defaultRenderOption,
    renderValue = defaultRenderValue,
    onChange,
    isEqual = defaultIsEqual,
    keyExtractor = defaultKeyExtractor,
    value,
    iconRight,
    ...props
}: BottomSheetSelectProps<T>) => {
    const searchInputRef = useRef<TextInput>(null);
    const [currentValue, setCurrentValue] = useState<T>();

    const { props: modalProps, bottomSheetModal } = useBottomSheetModal({
        onClose: useCallback(() => {
            if (props.searchable) {
                props.onSearchTextChange?.('');
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [props.searchable, props.searchable && props.onSearchTextChange]),
    });

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const forwardChange = useCallback(
        (opt: Option<T>) => {
            setCurrentValue(opt.item);
            onChange?.(opt);
            bottomSheetModal.close();
        },
        [bottomSheetModal, onChange],
    );

    const data = useMemo(
        () => options.map<Option<T>>(item => ({
                item,
                isActive: !!currentValue && isEqual(item, currentValue),
            })),
        [isEqual, options, currentValue],
    );

    const renderItem: ListRenderItem<Option<T>> = useCallback(
        ({ item, index }) => renderOption({
                ...item,
                index,
                select: () => forwardChange(item),
            }),
        [forwardChange, renderOption],
    );

    const keyExtr = useCallback(
        ({ item }: Option<T>, index: number) => (keyExtractor?.(item) ?? index).toString(),
        [keyExtractor],
    );

    return (
        <Wrapper style={style}>
            <Label>{label}</Label>
            <InputRow>
                <InputPressable
                    onPress={() => {
                        if (currentValue && props.searchable) {
                            props.onSearchTextChange?.(renderValue(currentValue)?.toString() ?? '');
                        }
                        bottomSheetModal.open();
                    }}
                >
                    <PseudoInput>
                        {currentValue ? (
                            <Value>{renderValue(currentValue)}</Value>
                        ) : (
                            <Placeholder>{placeholder}</Placeholder>
                        )}
                    </PseudoInput>
                </InputPressable>
                {iconRight}
            </InputRow>
            <BottomSheetModal {...modalProps}>
                <ListWrapper>
                    {props.searchable && (
                        <SearchInput
                            ref={searchInputRef}
                            value={props.searchText}
                            onChange={props.onSearchTextChange}
                            autoCapitalize="none"
                            autoFocus
                            onSubmitEditing={() => {
                                forwardChange(data[0]);
                            }}
                        />
                    )}
                    <BottomSheetFlatList<Option<T>>
                        keyboardShouldPersistTaps="handled"
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={keyExtr}
                    />
                </ListWrapper>
            </BottomSheetModal>
        </Wrapper>
    );
};
