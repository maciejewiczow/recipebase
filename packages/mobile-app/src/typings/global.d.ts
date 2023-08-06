export { };

declare global {
    export type EmptyObject = Record<string, never>;

    export type Defined<T> = Exclude<T, undefined | null>;

    export interface Stringable {
        toString(): string;
    }
}
