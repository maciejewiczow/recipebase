import { forEachDeep } from './forEachDeep';
import { isTemporaryId } from './isTemporaryId';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeTemporaryIds = (obj: any) => {
    const visited = new Set<object>();

    forEachDeep(obj, (key, value, parent) => {
        if (visited.has(value)) {
            return false;
        } else {
            visited.add(value);
        }

        if (key === 'id' && typeof value === 'number' && isTemporaryId(value)) {
            parent[key] = undefined;
        }

        return true;
    });
};
