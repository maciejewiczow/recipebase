import { forEachDeep } from './forEachDeep';

export const removeTemporaryIds = (obj: any) => {
    forEachDeep(obj, (key, value, parent) => {
        // eslint-disable-next-line yoda
        if (key === 'id' && typeof value === 'number' && 0 < value && value < 1)
            {parent[key] = undefined;}
    });
};
