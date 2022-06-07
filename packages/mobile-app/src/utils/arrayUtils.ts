
export const byNumberAsc = <T>(selector: (obj: T) => number) => (a: T, b: T) => selector(a) - selector(b);

export const byNumberDesc = <T>(selector: (obj: T) => number) => (a: T, b: T) => selector(b) - selector(a);
