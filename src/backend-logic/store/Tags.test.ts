import { Database } from '../Database';
import { createMockData, TestDatabaseBuilder } from '../utils/testUtils';
import { Tags } from './Tags';

describe('Tags', () => {
    let database: Database;

    beforeEach(async () => {
        TestDatabaseBuilder.init();
        database = await new TestDatabaseBuilder().withContent(createMockData()).build();
    });

    afterEach(async () => {
        await TestDatabaseBuilder.cleanup();
    });

    describe('fetchTags', () => {
        it('gets all tags that have non-zero recipe count from the database', async () => {
            const tags = new Tags(database);

            await tags.fetchTags();

            expect(tags.tags.length).toBeGreaterThan(0);

            for (const tag of tags.tags) {
                expect(tag.tag.recipeCount).toBeGreaterThan(0);
            }
        });

        it('sorts the tags descending by recipe count', async () => {
            const tags = new Tags(database);

            await tags.fetchTags();

            expect(tags.tags.length).toBeGreaterThan(0);

            for (let i = 0; i < tags.tags.length - 1; i++) {
                expect(tags.tags[i].tag.recipeCount).toBeGreaterThanOrEqual(tags.tags[i + 1].tag.recipeCount);
            }
        });

        it('sets initial tag state to not selected', async () => {
            const tags = new Tags(database);

            await tags.fetchTags();

            expect(tags.tags.length).toBeGreaterThan(0);

            for (const tag of tags.tags) {
                expect(tag.isSelected).toBeFalsy();
            }
        });
    });

    describe('filterByName', () => {
        it('returns empty array when passed string is empty', () => {
            const tags = new Tags(database);

            expect(tags.filterByNameWithoutDrafts('')).toHaveLength(0);
        });

        it('returns an array of tags with names matching the search string', () => {
            const tags = new Tags(database);
            const searchString = 'tag';

            const result = tags.filterByNameWithoutDrafts(searchString);

            for (const tag of result) {
                expect(tag.name).toMatch(new RegExp(searchString, 'i'));
            }
        });
    });

    describe('draft tags', () => {
        describe('addDraftTag', () => {
            it('adds a new tag with temporary id', () => {
                const tags = new Tags(database);
                const name = 'tag 1';

                tags.addDraftTag(name);

                expect(tags.draftTags).toHaveLength(1);
                expect(tags.draftTags[0].name).toBe(name);
            });

            it('returns true when new tag was added succesfully', () => {
                const tags = new Tags(database);
                const name = 'tag 1';

                const result = tags.addDraftTag(name);

                expect(result).toBe(true);
            });

            it('does not add a tag with duplicated tag name', () => {
                const tags = new Tags(database);
                const name = 'tag 1';

                tags.addDraftTag(name);
                tags.addDraftTag(name);

                expect(tags.draftTags).toHaveLength(1);
                expect(tags.draftTags[0].name).toBe(name);
            });

            it('returns false when the tag with given name is already present', () => {
                const tags = new Tags(database);
                const name = 'tag 1';

                tags.addDraftTag(name);
                const result = tags.addDraftTag(name);

                expect(result).toBe(false);
            });
        });

        describe('copyTagToDraftTags', () => {
            it('copies the tag with specified id from fetched tags to draft tags', async () => {
                const tags = new Tags(database);

                await tags.fetchTags();

                tags.copyTagToDraftTags(tags.tags[0].tag.id);

                expect(tags.draftTags).toHaveLength(1);
                expect(tags.draftTags[0].id).toBe(tags.tags[0].tag.id);
                expect(tags.draftTags[0].name).toBe(tags.tags[0].tag.name);
            });

            it('does not copy a tag with nonexistent id', async () => {
                const tags = new Tags(database);

                await tags.fetchTags();

                tags.copyTagToDraftTags(-1);

                expect(tags.draftTags).toHaveLength(0);
            });

            it('does not copy the tag when a tag with the same name is already in the draft tags', async () => {
                const tags = new Tags(database);

                await tags.fetchTags();

                tags.copyTagToDraftTags(tags.tags[0].tag.id);
                tags.copyTagToDraftTags(tags.tags[0].tag.id);

                expect(tags.draftTags).toHaveLength(1);
            });
        });

        describe('reoveDraftTagById', () => {
            it('removes a tag with given id from draft tags', async () => {
                const tags = new Tags(database);

                await tags.fetchTags();

                tags.copyTagToDraftTags(tags.tags[0].tag.id);
                tags.copyTagToDraftTags(tags.tags[1].tag.id);

                tags.removeDraftTagById(tags.tags[1].tag.id);

                expect(tags.draftTags).toHaveLength(1);
            });

            it('does nothing when given a nonexistent tag id', async () => {
                const tags = new Tags(database);

                await tags.fetchTags();

                tags.copyTagToDraftTags(tags.tags[0].tag.id);
                tags.copyTagToDraftTags(tags.tags[1].tag.id);

                tags.removeDraftTagById(-1);

                expect(tags.draftTags).toHaveLength(2);
            });
        });
    });

    describe('tag selection', () => {
        describe('toggleTagSelectedById', () => {
            it('toggles the selected state of a tag with given id', async () => {
                const tagIdToToggle = 1;
                const tags = new Tags(database);

                await tags.fetchTags();

                tags.toggleTagSelectedById(tagIdToToggle);

                expect(tags.tags.find(tag => tag.tag.id === tagIdToToggle)?.isSelected).toBeTruthy();

                tags.toggleTagSelectedById(tagIdToToggle);

                expect(tags.tags.find(tag => tag.tag.id === tagIdToToggle)?.isSelected).toBeFalsy();
            });
        });

        describe('selectedTags', () => {
            it('contains only tags that are selected', async () => {
                const tags = new Tags(database);

                await tags.fetchTags();

                tags.toggleTagSelectedById(tags.tags[0].tag.id);
                tags.toggleTagSelectedById(tags.tags[1].tag.id);

                expect(tags.selectedTags).toHaveLength(2);
                expect(tags.selectedTags).toEqual(expect.arrayContaining([tags.tags[0], tags.tags[1]]));
            });
        });

        describe('notSelectedTags', () => {
            it('contains only tags that are not selected', async () => {
                const tags = new Tags(database);

                await tags.fetchTags();

                tags.toggleTagSelectedById(tags.tags[0].tag.id);
                tags.toggleTagSelectedById(tags.tags[1].tag.id);

                expect(tags.notSelectedTags).toHaveLength(tags.tags.length - 2);
                expect(tags.notSelectedTags).toEqual(
                    expect.not.arrayContaining([tags.tags[0], tags.tags[1]]),
                );
                expect(tags.notSelectedTags).toEqual(expect.arrayContaining(tags.tags.slice(2)));
            });
        });

        describe('partitionedTags', () => {
            it('contains all the tags', async () => {
                const tags = new Tags(database);

                await tags.fetchTags();

                expect(tags.tags.length).toBe(tags.partitionedTags.length);
            });

            test('the selected tags are first, then the not selected tags', async () => {
                const tags = new Tags(database);

                await tags.fetchTags();

                const tagsToToggle = [tags.tags[0], tags.tags[2]];

                tags.toggleTagSelectedById(tagsToToggle[0].tag.id);
                tags.toggleTagSelectedById(tagsToToggle[1].tag.id);

                expect(tags.partitionedTags.slice(0, 2)).toEqual(expect.arrayContaining(tagsToToggle));
                expect(tags.partitionedTags.slice(2)).toEqual(
                    expect.arrayContaining(
                        tags.tags.filter(
                            ({ tag }) => !tagsToToggle.map(({ tag: t }) => t.id).includes(tag.id),
                        ),
                    ),
                );
            });
        });
    });

    describe('saveDraftTags', () => {
        it.todo('TODO: add tests here');
    });
});
