import AsyncStorage from '@react-native-async-storage/async-storage';
import sqlite from 'react-native-sqlite-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Config } from 'react-native-config';
import {
    CurrentRecipe,
    Database,
    DraftIngredient,
    DraftRecipe,
    Ingredients,
    Recipes,
    Tags,
    Units,
} from 'backend-logic';
import RootNavigation from './RootNavigation';
import { createMobxDebugger } from 'mobx-flipper';
import { spy } from 'mobx';
import { debugMobxActions } from 'mobx-action-flipper';

GoogleSignin.configure({
    scopes: [/* 'https://www.googleapis.com/auth/drive' */],
    webClientId: Config.GOOGLE_CLIENT_ID,
    offlineAccess: true,
});

export class Root {
    private static dbPathStorageKey = 'dbPath';
    private database?: Database;

    recipes!: Recipes;
    currentRecipe!: CurrentRecipe;
    tags!: Tags;
    ingredients!: Ingredients;
    units!: Units;
    draftIngredient!: DraftIngredient;
    draftRecipe!: DraftRecipe;

    async initalize() {
        // await AsyncStorage.removeItem(Initalize.dbPathStorageKey);
        const dbFilePath = await AsyncStorage.getItem(Root.dbPathStorageKey);

        if (!dbFilePath)
            RootNavigation.replace('SelectDatabase');
        else
            await this.initalizeAndGoHome(dbFilePath);
    }

    async initalizeDbAndUpdateSavedFilePath(dbFilePath: string) {
        await AsyncStorage.setItem(Root.dbPathStorageKey, dbFilePath);
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
        this.ingredients = new Ingredients(this.database);
        this.units = new Units(this.database);
        this.draftIngredient = new DraftIngredient(this.database);
        this.currentRecipe = new CurrentRecipe(this.database);
        this.draftRecipe = new DraftRecipe(this.database);

        // FIXME: uncomment after the plugin supports circular structures
        // if (Config.DEBUG) {
        //     spy(createMobxDebugger(this.recipes));
        //     spy(createMobxDebugger(this.tags));
        //     spy(createMobxDebugger(this.ingredients));
        //     debugMobxActions({
        //         recipes: this.recipes,
        //         tags: this.tags,
        //         ingredients: this.ingredients
        //     });
        // }
    }

    private async initalizeDatabase(dbPath: string) {
        this.database = await Database.init(dbPath, sqlite);
    }
}
