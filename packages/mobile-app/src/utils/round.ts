export const round = (x: number, decimalPlaces: number) =>
    Math.round((x + Number.EPSILON) * 10 ** decimalPlaces) / 10 ** decimalPlaces;
