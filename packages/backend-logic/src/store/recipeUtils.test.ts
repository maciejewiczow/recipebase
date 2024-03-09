import { parseQuantityString } from './recipeUtils';

interface TestCaseData {
    quantityString: string;
    expected: {
        quantityFrom: number;
        quantityTo: number | undefined;
    };
}

describe('parseQuantityStringsToIngredientQuantities', () => {
    it.each<TestCaseData>([
        {
            quantityString: '12',
            expected: {
                quantityFrom: 12,
                quantityTo: undefined,
            },
        },
        {
            quantityString: '69',
            expected: {
                quantityFrom: 69,
                quantityTo: undefined,
            },
        },
        {
            quantityString: '12-13',
            expected: {
                quantityFrom: 12,
                quantityTo: 13,
            },
        },
        {
            quantityString: '12 - 13',
            expected: {
                quantityFrom: 12,
                quantityTo: 13,
            },
        },
        {
            quantityString: '1/2',
            expected: {
                quantityFrom: 1 / 2,
                quantityTo: undefined,
            },
        },
        {
            quantityString: '12.5',
            expected: {
                quantityFrom: 12.5,
                quantityTo: undefined,
            },
        },
        {
            quantityString: '12.5-420.69',
            expected: {
                quantityFrom: 12.5,
                quantityTo: 420.69,
            },
        },
        {
            quantityString: '12.5 - 420.69',
            expected: {
                quantityFrom: 12.5,
                quantityTo: 420.69,
            },
        },
        {
            quantityString: '3/4 - 5/6',
            expected: {
                quantityFrom: 3 / 4,
                quantityTo: 5 / 6,
            },
        },
        {
            quantityString: '12.5 - 69/420',
            expected: {
                quantityFrom: 12.5,
                quantityTo: 420.69,
            },
        },
    ])("parses '$quantityString' correctly", ({ quantityString, expected }) => {
        const result = parseQuantityString(quantityString);

        expect(result.quantityFrom).toBeCloseTo(expected.quantityFrom);

        if (expected.quantityTo !== undefined) {
            expect(result.quantityTo).toBeCloseTo(expected.quantityTo);
        } else {
            expect(result.quantityTo).toBeUndefined();
        }
    });
});
