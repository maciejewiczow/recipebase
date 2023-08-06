import { RefObject, useEffect, useRef } from 'react';

export const useNonMemoCallbackRef = <T extends ((...args: any) => any) | undefined>(fn: T): RefObject<T> => {
    const ref = useRef<T>(fn);

    useEffect(() => {
        ref.current = fn;
    }, [fn]);

    return ref;
};
