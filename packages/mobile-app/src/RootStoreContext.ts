import { createContext, useContext } from 'react';
import { Root } from './store/Root';

export const rootStore = new Root();

export const RootStoreContext = createContext<Root>(rootStore);

export const useRootStore = () => useContext(RootStoreContext);
