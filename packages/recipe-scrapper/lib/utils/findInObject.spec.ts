import { findInObject } from './findInObject';

describe('findInObject', () => {
    it('returns undefined for no match', () => {
        expect(findInObject({}, () => false)).toBeUndefined();
    });

    it('returns a value that matches the predicate', () => {
        expect(findInObject(42, obj => obj === 42)).toBe(42);
    });

    it('works for nested values', () => {
        expect(findInObject({ blah: 42 }, obj => obj === 42)).toBe(42);
    });

    it.each(
        [
            { test: 42 },
            { test: { test: 42 } },
            { test: { test: { test: { test: 42 } } } },
            { test: { test: { test: { test: { test: { test: { test: { test: { test: 42 } } } } } } } } },
        ]
    )('works for any level of nesting', obj => {
        expect(findInObject(obj, o => o === 42)).toBe(42);
    });

    it('works for nested arrays', () => {
        const obj = [[[[[[['testtets', [[[[[[['test', 42]]]]]]]]]]]]]];

        expect(findInObject(obj, o => o === 42)).toBe(42);
    });

    it('returns the first occurence', () => {
        const needle = { thrash: 'can' };
        const obj = {
            test: 'test',
            trueNeedle: needle,
            anotherNeedle: { thrash: 'can\'t' },
        };

        expect(findInObject(obj, o => typeof o === 'object' && 'thrash' in o)).toBe(needle);
    });
});
