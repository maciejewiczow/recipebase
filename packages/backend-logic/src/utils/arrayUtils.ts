type ComparisonValue = string | number;

type Selector<T> = (obj: T) => ComparisonValue;

const comparison = (a: ComparisonValue, b: ComparisonValue) => {
    if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
    }

    if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
    }

    return a.toString().localeCompare(b.toString());
};

export const ascendingBy =
    <T>(selector: Selector<T>) =>
    (a: T, b: T) =>
        comparison(selector(a), selector(b));

export const descendingBy =
    <T>(selector: Selector<T>) =>
    (a: T, b: T) =>
        comparison(selector(b), selector(a));
