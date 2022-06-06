import { Database, Tag } from 'backend-logic';
import { makeAutoObservable } from 'mobx';

export interface TagWithSelectedState {
    tag: Tag;
    isSelected: boolean;
}

export class Tags {
    tags: TagWithSelectedState[] = [];

    constructor(private database: Database) {
        makeAutoObservable(this);
    }

    *fetchTags() {
        const res: Tag[] = yield this.database.tagRepository
            ?.createQueryBuilder('tag')
            .innerJoinAndSelect('tag.recipes', 'recipes')
            .getMany();

        this.tags = res.map(tag => ({ tag, isSelected: false }));
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
        return this.tags.filter(t => !t.isSelected);
    }

    get partitionedTags() {
        return [...this.selectedTags || [], ...this.notSelectedTags];
    }
}
