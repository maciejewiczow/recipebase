import { forEachDeep } from './forEachDeep';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeTemporaryIds = (obj: any) => {
    forEachDeep(obj, (key, value, parent) => {
        if (key === 'id' && typeof value === 'number' && value > 0 && value < 1) {
            parent[key] = undefined;
        }
    });
};
