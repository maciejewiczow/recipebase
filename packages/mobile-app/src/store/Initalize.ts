import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Config } from 'react-native-config';
import { Database } from 'backend-logic';
import RootNavigation from '../RootNavigation';

GoogleSignin.configure({
    scopes: [/* 'https://www.googleapis.com/auth/drive' */],
    webClientId: Config.GOOGLE_CLIENT_ID,
    offlineAccess: true,
});

export class Initalize {
    private static dbPathStorageKey = 'dbPath';
    private database?: Database;

    constructor() {
        makeAutoObservable(this);
    }

    async initalize() {
        // await AsyncStorage.removeItem(Initalize.dbPathStorageKey);
        const dbFilePath = await AsyncStorage.getItem(Initalize.dbPathStorageKey);

        if (!dbFilePath)
            RootNavigation.replace('SelectDatabase');
        else
            await this.initalizeDatabaseAndGoHome(dbFilePath);
    }

    async initalizeDbAndUpdateSavedFilePath(dbFilePath: string) {
        await AsyncStorage.setItem(Initalize.dbPathStorageKey, dbFilePath);
        await this.initalizeDatabaseAndGoHome(dbFilePath);
    }

    private async initalizeDatabaseAndGoHome(dbPath: string) {
        console.log('Initalizing database in ', dbPath);
        this.database = new Database(dbPath);
        await this.database.initalize();

        RootNavigation.replace('HomeTabNavigator');
    }
}

const initalize = new Initalize();
export default initalize;
