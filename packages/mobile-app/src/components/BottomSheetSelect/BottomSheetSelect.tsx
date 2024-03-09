import React, {
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    ListRenderItem,
    StyleProp,
    TextInput,
    TouchableWithoutFeedback,
    ViewStyle,
} from 'react-native';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useBottomSheetModal } from '~/utils/useBottomSheet';
import { Label } from '../Input/Input.styles';
import {
    ListWrapper,
    Placeholder,
    PseudoInput,
    SearchInput,
    Value,
    Wrapper,
} from './BottomSheetSelect.styles';

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

export const BottomSheetSelect = <T,>({
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
        onOpen: useCallback(() => searchInputRef.current?.focus(), []),
    });

    const [currentValue, setCurrentValue] = useState<T>();

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
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus
                        autoCapitalize="none"
                        onSubmitEditing={() => forwardChange(data[0])}
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
