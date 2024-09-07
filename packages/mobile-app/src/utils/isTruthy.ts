export const isTruthy = <T>(thing: T): thing is Exclude<T, null | undefined | 0 | '' | false> => !!thing;
