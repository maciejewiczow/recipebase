import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootNavigation from '../RootNavigation';

export class Initalize {
    private static dbPathStorageKey = 'dbPath';

    constructor() {
        makeAutoObservable(this);
    }

    *initalize() {
        const dbPath: string | null = yield AsyncStorage.getItem(Initalize.dbPathStorageKey);

        if (!dbPath) {
            RootNavigation.replace('SelectDatabase');
        } else {
            // initalize database

            RootNavigation.replace('Home');
        }
    }
}

const initalize = new Initalize();
export default initalize;
