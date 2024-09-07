import { forEachDeep } from './forEachDeep';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeTemporaryIds = (obj: any) => {
    const visited = new Set<object>();

    forEachDeep(obj, (key, value, parent) => {
        if (visited.has(value)) {
            return false;
        } else {
            visited.add(value);
        }

        // eslint-disable-next-line yoda
        if (key === 'id' && typeof value === 'number' && 0 < value && value < 1) {
            parent[key] = undefined;
        }

        return true;
    });
};
