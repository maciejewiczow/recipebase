type Visitor = (key: string | number, value: any, obj: any, path: string) => any

function forEachObject(obj: Record<string | number, any>, fn: Visitor, path: string) {
    for (const key of Object.keys(obj)) {
        const deepPath = path ? `${path}.${key}` : key;

        // Note that we always use obj[key] because it might be mutated by forEach
        fn(key, obj[key], obj, deepPath);

        forEachDeep(obj[key], fn, deepPath);
    }
}

function forEachArray(array: any[], fn: Visitor, path: string) {
    array.forEach((value, index, arr) => {
        const deepPath = `${path}[${index}]`;

        fn(index, value, arr, deepPath);

        // Note that we use arr[index] because it might be mutated by forEach
        forEachDeep(arr[index], fn, deepPath);
    });
}

export function forEachDeep(value: any, fn: Visitor, path = '') {
    if (Array.isArray(value))
        forEachArray(value, fn, path);
    else if (typeof value === 'object' && value)
        forEachObject(value, fn, path);
}
