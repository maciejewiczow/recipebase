import { useEffect, useRef } from 'react';

export const usePreviousValue = <T>(value: T) => {
    const previousRef = useRef<T>();

    useEffect(() => {
        previousRef.current = value;
    }, [value]);

    return previousRef.current;
};
