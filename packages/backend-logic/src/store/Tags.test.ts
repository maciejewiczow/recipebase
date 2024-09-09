import { Database } from '../Database';
import { TestDatabaseBuilder } from '../utils/testUtils';
import { Tags } from './Tags';

describe('Tags', () => {
    let database: Database;

    beforeAll(() => {
        TestDatabaseBuilder.init()
    })

    beforeEach(async () => {
        database = await new TestDatabaseBuilder().withContent().build()
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

    describe('toggleTagSelectedById', () => {
        it('toggles the selected state of a tag with given id', async () => {
            const tags = new Tags(database);

            await tags.fetchTags();

            tags.toggleTagSelectedById(1);

            expect(tags.tags.find(tag => tag.tag.id === 1)?.isSelected).toBeTruthy();

            tags.toggleTagSelectedById(1);

            expect(tags.tags.find(tag => tag.tag.id === 1)?.isSelected).toBeFalsy();
        });
    });
});
