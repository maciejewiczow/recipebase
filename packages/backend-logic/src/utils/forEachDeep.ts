/* eslint-disable @typescript-eslint/no-explicit-any */
type Visitor = (key: string | number, value: any, obj: any, path: string) => boolean | void;

const forEachObject = (obj: Record<string | number, any>, fn: Visitor, path: string) => {
    for (const key of Object.keys(obj)) {
        const deepPath = path ? `${path}.${key}` : key;

        if (fn(key, obj[key], obj, deepPath)) {
            // Note that we always use obj[key] because it might be mutated by forEach
            forEachDeep(obj[key], fn, deepPath);
        }
    }
};

const forEachArray = (array: unknown[], fn: Visitor, path: string) => {
    array.forEach((value, index, arr) => {
        const deepPath = `${path}[${index}]`;

        if (fn(index, value, arr, deepPath)) {
            // Note that we use arr[index] because it might be mutated by forEach
            forEachDeep(arr[index], fn, deepPath);
        }
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function forEachDeep(value: any, fn: Visitor, path = '') {
    if (Array.isArray(value)) {
        forEachArray(value, fn, path);
    } else if (typeof value === 'object' && value) {
        forEachObject(value, fn, path);
    }
}
