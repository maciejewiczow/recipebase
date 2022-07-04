import { Database, Tag } from 'backend-logic';
import { makeAutoObservable } from 'mobx';
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
