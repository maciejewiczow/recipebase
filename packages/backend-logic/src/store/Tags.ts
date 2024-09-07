import { Database, Recipe, Tag } from 'backend-logic';
import { byNumberDesc } from 'backend-logic/src/utils/arrayUtils';
import { cloneDeep } from 'lodash';
import { computed, flow, makeAutoObservable } from 'mobx';
import { removeTemporaryIds } from '../utils/removeTemporaryIds';
import { yieldResult } from '../utils/yieldResult';

export interface TagWithCount extends Tag {
    recipeCount: number;
}

export interface TagWithSelectedState {
    tag: TagWithCount;
    isSelected: boolean;
}

export class Tags {
    tags: TagWithSelectedState[] = [];
    draftTags: Tag[] = [];

    constructor(private database: Database) {
        makeAutoObservable(this);
    }

    fetchTags = flow(function* (this: Tags) {
        const res: TagWithCount[] = yield this.database.tagRepository
            .createQueryBuilder('tag')
            .loadRelationCountAndMap('tag.recipeCount', 'tag.recipes', 'recipeCount')
            .getMany();

        this.tags = res
            .filter(tag => tag.recipeCount > 0)
            .sort(byNumberDesc(tag => tag.recipeCount))
            .map(tag => ({ tag, isSelected: false }));
    });

    toggleTagSelectedById(id: number) {
        const item = this.tags.find(it => it.tag.id === id);

        if (!item) {
            return;
        }

        item.isSelected = !item.isSelected;
    }

    addDraftTag(name: string) {
        if (this.draftTags.find(t => t.name.toLowerCase() === name.toLowerCase())) {
            return false;
        }

        const newTag: Tag = {
            name,
            id: Math.random(),
            deletedAt: null,
        };

        this.draftTags.push(newTag);
        return true;
    }

    copyTagToDraftTags(tagId: number) {
        const tag = this.tags.find(t => t.tag.id === tagId)?.tag;

        if (tag && !this.draftTags.find(t => t.name.toLowerCase() === tag.name.toLowerCase())) {
            this.draftTags.push(tag);
        }
    }

    removeDraftTagById(id: number) {
        this.draftTags = this.draftTags.filter(t => t.id !== id);
    }

    copyRecipeTagsToDraftTags(recipe: Recipe | undefined) {
        if (!recipe) {
            return;
        }

        this.draftTags = recipe.tags ?? [];
    }

    @computed
    filterByName(filterString: string) {
        if (!filterString) {
            return [];
        }

        return this.tags
            .map(t => t.tag)
            .filter(t => t.name.toLowerCase().includes(filterString.toLowerCase()));
    }

    get tagsWithDraftTags() {
        return [...this.tags.map(t => t.tag), ...this.draftTags];
    }

    get selectedTags() {
        return this.tags.filter(tag => tag.isSelected);
    }

    get notSelectedTags() {
        return this.tags.filter(tag => !tag.isSelected);
    }

    get partitionedTags() {
        return [...this.selectedTags, ...this.notSelectedTags];
    }

    saveDraftTags = flow(function* (this: Tags, recipe: Recipe) {
        const tagsToSave = cloneDeep(this.draftTags);

        for (const tag of tagsToSave) {
            tag.recipes = [...(tag.recipes ?? []), recipe];
        }

        removeTemporaryIds(tagsToSave);

        const savedTags = yield* yieldResult(() => this.database.tagRepository.save(tagsToSave))();

        this.draftTags = [];
        yield this.fetchTags();

        return savedTags;
    });
}
