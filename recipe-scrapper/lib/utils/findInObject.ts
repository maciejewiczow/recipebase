export const findInObject = (object: any, predicate: (obj: any) => boolean): any | undefined => {
    if (predicate(object))
        return object;

    if (Array.isArray(object)) {
        for (const el of object) {
            if (predicate(el))
                return el;
        }
    }

    if (typeof object === 'object') {
        for (const val of Object.values(object)) {
            const res = findInObject(val, predicate);

            if (res !== undefined)
                return res;
        }
    }
};
