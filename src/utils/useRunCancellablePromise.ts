import { useEffect } from 'react';
import { CancellablePromise } from 'mobx/dist/internal';
import { catchCancelledFlow } from './catchCancelledFlow';

export const useRunCancellablePromise = (runner: () => CancellablePromise<unknown>, deps: unknown[]) => {
    useEffect(() => {
        const promise = runner();

        promise.catch(catchCancelledFlow);

        return () => promise.cancel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};
