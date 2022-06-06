import { makeAutoObservable } from 'mobx';
import { ILike } from 'typeorm/browser';
import { Database, Recipe, Tag } from 'backend-logic';
import { Brackets } from 'typeorm';

export class Recipes {
    isFetchingRecipes = false;
    recipes: Recipe[] = [];

    constructor(private database: Database) {
        makeAutoObservable(this);
    }

    *fetchRecipes(searchText: string, selectedTags: Tag[]) {
        this.isFetchingRecipes = true;
        const escapedText = searchText.trim().replace('%', '\\%').replace('_', '\\_');

        if (escapedText.length === 0 && selectedTags.length === 0) {
            this.recipes = yield this.database.recipeRepository?.find({ relations: ['tags'] });
            this.isFetchingRecipes = false;
            return;
        }

        this.recipes = yield this.database.recipeRepository
            ?.createQueryBuilder('recipe')
            .select('recipe')
            .leftJoinAndSelect('recipe.tags', 'tag')
            // .where('recipe.tags IN (:...selectedTags)', { selectedTags })
            .where(
                new Brackets(qb => qb
                    .where('recipe.name LIKE :searchText', { searchText: `%${escapedText}%` })
                    .orWhere('recipe.description LIKE :searchText', { searchText: `%${escapedText}%` })
                )
            )
            .getMany();
        // ?.find({
        //     where: [
        //         { name: ILike(`%${escapedText}%`) },
        //         { description: ILike(`%${escapedText}%`) },
        //     ],
        //     relations: ['tags'],
        // });
        this.isFetchingRecipes = false;
    }

    fetchRecipeById(id: Recipe['id']) {
        return this.database.recipeRepository?.findOneBy({ id });
    }
}
