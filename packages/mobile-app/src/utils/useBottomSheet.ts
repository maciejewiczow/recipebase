import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { defaults } from 'lodash';
import {
    ComponentPropsWithRef,
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from 'react';
import { defaultValues } from './defaultValues';
import { useNonMemoCallbackRef } from './useNonMemoCallbackRef';

interface UseBottomSheetModalReturn {
    props: Pick<ComponentPropsWithRef<typeof BottomSheetModal>, 'ref' | 'index' | 'snapPoints' | 'backdropComponent' | 'enablePanDownToClose' | 'onChange' | 'onAnimate'>;
    bottomSheetModal: {
        open: () => void;
        close: () => void;
    };
}

interface UseBottomSheetModalArgs {
    height: string | number;
    onChange?: BottomSheetModalProps['onChange'];
    onAnimate?: BottomSheetModalProps['onAnimate'];
    onOpen?: () => void;
    onClose?: () => void;
}

export const useBottomSheetModal = (args?: Partial<UseBottomSheetModalArgs>): UseBottomSheetModalReturn => {
    const { height, onChange, onClose, onOpen, onAnimate } = defaultValues(args, {
        height: '45%',
    });

    console.log(onOpen);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ([1, height ?? '45%']), [height]);
    const onChangeRef = useNonMemoCallbackRef(onChange);
    const onOpenRef = useNonMemoCallbackRef(onOpen);
    const onCloseRef = useNonMemoCallbackRef(onClose);
    const onAnimateRef = useNonMemoCallbackRef(onAnimate);

    const open = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const close = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const forwardOnChange: Defined<BottomSheetModalProps['onChange']> = useCallback(index => {
        if (index === 0)
            bottomSheetModalRef.current?.close();

        onChangeRef.current?.(index);
    }, [onChangeRef]);

    const triggerAnimationCallbacks: Defined<BottomSheetModalProps['onAnimate']> = useCallback(
        (from, to) => {
            if (from === -1 && to !== -1)
                onOpenRef.current?.();
            else if (from !== -1 && to === -1)
                onCloseRef.current?.();

            onAnimateRef.current?.(from, to);
        },
        [onAnimateRef, onCloseRef, onOpenRef]
    );

    return {
        props: {
            snapPoints,
            onChange: forwardOnChange,
            backdropComponent: BottomSheetBackdrop,
            enablePanDownToClose: true,
            ref: bottomSheetModalRef,
            onAnimate: triggerAnimationCallbacks,
            index: 1,
        },
        bottomSheetModal: {
            open,
            close,
        },
    };

};
