declare module 'mobx-flipper' {
    export function createMobxDebugger(store: any): (change: SpyEvent) => void;
}
