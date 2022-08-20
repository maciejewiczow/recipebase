import { Database, Tag } from 'backend-logic';
import { computed, makeAutoObservable } from 'mobx';
import { byNumberDesc } from 'backend-logic/src/utils/arrayUtils';

export interface TagWithCount extends Tag {
    recipeCount: number;
}

export interface TagWithSelectedState {
    tag: TagWithCount;
    isSelected: boolean;
}

export class Tags {
    tags: TagWithSelectedState[] = [];
    draftTags: TagWithCount[] = [];

    constructor(private database: Database) {
        makeAutoObservable(this);
    }

    *fetchTags() {
        const res: TagWithCount[] = yield this.database.tagRepository
            ?.createQueryBuilder('tag')
            .loadRelationCountAndMap('tag.recipeCount', 'tag.recipes', 'recipeCount')
            .getMany();

        this.tags = res
            .filter(tag => tag.recipeCount > 0)
            .sort(byNumberDesc(tag => tag.recipeCount))
            .map(tag => ({ tag, isSelected: false }));
    }

    toggleTagSelectedById(id: number) {
        const item = this.tags.find(it => it.tag.id === id);

        if (!item)
            return;

        item.isSelected = !item.isSelected;
    }

    addDraftTag(name: string) {
        const newTag: TagWithCount = {
            name,
            id: Math.random(),
            recipeCount: 1,
        };

        if (!this.draftTags.find(t => t.name.toLowerCase() === name.toLowerCase()))
            this.draftTags.push(newTag);
    }

    copyTagToDraftTags(tagId: number) {
        const tag = this.tags.find(t => t.tag.id === tagId)?.tag;

        if (tag && !this.draftTags.find(t => t.name.toLowerCase() === tag.name.toLowerCase()))
            this.draftTags.push(tag);
    }

    removeDraftTagById(id: number) {
        this.draftTags = this.draftTags.filter(t => t.id !== id);
    }

    @computed
    filterByName(filterString: string) {
        if (!filterString)
            return [];

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
}
