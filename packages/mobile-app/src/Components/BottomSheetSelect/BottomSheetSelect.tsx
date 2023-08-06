import React, {
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    Wrapper,
    PseudoInput,
    Placeholder,
    ListWrapper,
    Value,
    SearchInput,
} from './BottomSheetSelect.styles';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import {
    StyleProp,
    ViewStyle,
    TouchableWithoutFeedback,
    ListRenderItem,
    TextInput,
} from 'react-native';
import { Label } from '../Input/Input.styles';
import { useBottomSheetModal } from '~/utils/useBottomSheet';

interface Option<T> {
    item: T;
    isActive: boolean;
}

interface OptionWithIndex<T> extends Option<T> {
    index: number;
}

interface ListOption<T> extends OptionWithIndex<T> {
    select: () => void;
}

export interface BottomSheetSelectProps<T> {
    label?: string;
    placeholder?: string;
    style?: StyleProp<ViewStyle>;
    options: T[];
    renderOption: (opt: ListOption<T>) => ReactElement;
    renderValue: (val: T) => string | number | null | undefined;
    onChange?: (opt: Option<T>) => void;
    keyExtractor?: (item: T) => Stringable;
    isEqual: (a: T, b: T) => boolean;
    value?: T;
    searchText?: string;
    onSearchTextChange?: (text: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const BottomSheetSelect = <T extends unknown>({
    label,
    placeholder,
    style,
    options,
    renderOption,
    renderValue,
    onChange,
    isEqual,
    keyExtractor,
    value,
    searchText,
    onSearchTextChange,
}: BottomSheetSelectProps<T>) => {
    const searchInputRef = useRef<TextInput>(null);

    const { props, bottomSheetModal } = useBottomSheetModal({
        height: '45%',
        onOpen: () => searchInputRef.current?.focus(),
    });

    const [currentValue, setCurrentValue] = useState<T>();

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const forwardChange = useCallback(
        (opt: OptionWithIndex<T>) => {
            setCurrentValue(opt.item);
            onChange?.(opt);
            bottomSheetModal.close();
        },
        [bottomSheetModal, onChange]
    );

    const data = useMemo(
        () => options.map<Option<T>>(item => ({
            item,
            isActive: !!currentValue && isEqual(item, currentValue),
        })),
        [isEqual, options, currentValue]
    );

    const renderItem: ListRenderItem<Option<T>> = useCallback(
        ({ item, index }) => renderOption({
            ...item,
            index,
            select: () => forwardChange({ ...item, index }),
        }),
        [forwardChange, renderOption]
    );

    const keyExtr = useCallback(
        ({ item }: Option<T>, index: number) => (keyExtractor?.(item) ?? index).toString(),
        [keyExtractor]
    );

    return (
        <Wrapper style={style}>
            <Label>{label}</Label>
            <TouchableWithoutFeedback onPress={bottomSheetModal.open}>
                <PseudoInput>
                    {currentValue ? (
                        <Value>{renderValue(currentValue)}</Value>
                    ) : (
                        <Placeholder>{placeholder}</Placeholder>
                    )}
                </PseudoInput>
            </TouchableWithoutFeedback>
            <BottomSheetModal {...props}>
                <ListWrapper>
                    <SearchInput
                        ref={searchInputRef}
                        value={searchText}
                        onChange={onSearchTextChange}
                        autoCapitalize="none"
                    />
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

