import { createContext, useContext } from 'react';
import { Root } from './RootStore';

export const rootStore = new Root();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.rootStore = rootStore;

export const RootStoreContext = createContext<Root>(rootStore);

export const useRootStore = () => useContext(RootStoreContext);
