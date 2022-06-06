import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Config } from 'react-native-config';
import { Database, Recipe } from 'backend-logic';
import RootNavigation from '../RootNavigation';
import { Recipes } from './Recipes';
import { Tags } from './Tags';

GoogleSignin.configure({
    scopes: [/* 'https://www.googleapis.com/auth/drive' */],
    webClientId: Config.GOOGLE_CLIENT_ID,
    offlineAccess: true,
});

export class Initalize {
    private static dbPathStorageKey = 'dbPath';
    private database?: Database;

    recipes?: Recipes;
    tags?: Tags;

    async initalize() {
        // await AsyncStorage.removeItem(Initalize.dbPathStorageKey);
        const dbFilePath = await AsyncStorage.getItem(Initalize.dbPathStorageKey);

        if (!dbFilePath)
            RootNavigation.replace('SelectDatabase');
        else
            await this.initalizeAndGoHome(dbFilePath);
    }

    async initalizeDbAndUpdateSavedFilePath(dbFilePath: string) {
        await AsyncStorage.setItem(Initalize.dbPathStorageKey, dbFilePath);
        await this.initalizeAndGoHome(dbFilePath);
    }

    private async initalizeAndGoHome(dbPath: string) {
        await this.initalizeDatabase(dbPath);
        this.initalizeStore();

        RootNavigation.replace('HomeTabNavigator');
    }

    private initalizeStore() {
        if (!this.database)
            throw new Error('Cannot initalize store without database');

        this.recipes = new Recipes(this.database);
        this.tags = new Tags(this.database);
    }

    private async initalizeDatabase(dbPath: string) {
        console.log('Initalizing database in ', dbPath);

        this.database = new Database(dbPath);
        await this.database.initalize();
    }
}

const init = new Initalize();
export default init;
