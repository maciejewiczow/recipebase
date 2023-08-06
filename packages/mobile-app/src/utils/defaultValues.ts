import { mergeWith } from 'lodash';

export const defaultValues = <T>(obj: Partial<T> | null | undefined, defaults: T): T => {
    if (!obj)
        return defaults;

    return mergeWith({}, obj, defaults, (dest, src) => (src !== undefined ? src : dest));
};
