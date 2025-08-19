import { ComponentPropsWithRef, useCallback, useMemo, useRef } from 'react';
import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetModal,
    BottomSheetModalProps,
} from '@gorhom/bottom-sheet';

interface UseBottomSheetModalReturn {
    props: Pick<
        ComponentPropsWithRef<typeof BottomSheetModal>,
        | 'ref'
        | 'index'
        | 'snapPoints'
        | 'backdropComponent'
        | 'enablePanDownToClose'
        | 'onChange'
        | 'onAnimate'
        | 'enableDynamicSizing'
    >;
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

const Backdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
    />
);

export const useBottomSheetModal = (
    { height = '45%', onChange, onOpen, onClose, onAnimate }: Partial<UseBottomSheetModalArgs> = {
        height: '45%',
    },
): UseBottomSheetModalReturn => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => [height], [height]);

    const open = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const close = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const forwardOnChange: Defined<BottomSheetModalProps['onChange']> = useCallback(
        (index, ...args) => {
            if (index === -1) {
                bottomSheetModalRef.current?.close();
            }

            onChange?.(index, ...args);
        },
        [onChange],
    );

    const triggerAnimationCallbacks: Defined<BottomSheetModalProps['onAnimate']> = useCallback(
        (from, to, ...args) => {
            if (from === -1 && to !== -1) {
                onOpen?.();
            } else if (from !== -1 && to === -1) {
                onClose?.();
            }

            onAnimate?.(from, to, ...args);
        },
        [onAnimate, onClose, onOpen],
    );

    return {
        props: {
            snapPoints,
            onChange: forwardOnChange,
            backdropComponent: Backdrop,
            enablePanDownToClose: true,
            ref: bottomSheetModalRef,
            onAnimate: triggerAnimationCallbacks,
            index: 0,
            enableDynamicSizing: false,
        },
        bottomSheetModal: {
            open,
            close,
        },
    };
};
