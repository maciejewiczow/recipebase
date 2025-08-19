export const optionalArrayItem = <T>(item: T | null | undefined | false | '' | 0): T[] => {
    if (!item) {
        return [];
    }

    return [item];
};
