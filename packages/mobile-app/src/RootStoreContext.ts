import { createContext, useContext } from 'react';
import { Root } from './RootStore';

export const rootStore = new Root();

export const RootStoreContext = createContext<Root>(rootStore);

export const useRootStore = () => useContext(RootStoreContext);
