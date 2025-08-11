import { useCallback, useEffect, useState } from 'react';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { usePreviousValue } from './usePreviousValue';

export const useSecureStorageValue = <T>(storageKey: string, initialValue: T) => {
    const [value, setValue] = useState<T>(initialValue);
    const prevousKey = usePreviousValue(storageKey);

    const persistValue = useCallback(async () => {
        await RNSecureStorage.setItem(storageKey, JSON.stringify(value), {
            accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        });
    }, [value, storageKey]);

    useEffect(() => {
        if (prevousKey && prevousKey !== storageKey) {
            RNSecureStorage.removeItem(prevousKey).then(v => {
                if (v) {
                    return RNSecureStorage.setItem(storageKey, v, {
                        accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
                    });
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storageKey]);

    useEffect(() => {
        RNSecureStorage.getItem(storageKey)
            .then(item => {
                if (item) {
                    setValue(JSON.parse(item));
                }
            })
            .catch(e => console.log(e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [value, setValue, persistValue] as const;
};
