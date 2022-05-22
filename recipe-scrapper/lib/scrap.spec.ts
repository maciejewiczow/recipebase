import fs from 'fs/promises';
import path from 'path';

import { scrap } from './scrap';

describe('scrap', () => {
    let testCases: Record<string, string>;

    beforeAll(async () => {
        const tcPath = path.join(__dirname, '../testcases');
        const tcFiles = await fs.readdir(tcPath);

        testCases = Object.fromEntries<string>(
            await Promise.all(
                tcFiles
                    .map(file => fs.readFile(path.join(tcPath, file), { encoding: 'utf-8' })
                        .then(fileContent => [path.parse(file).name, fileContent] as [string, string])
                    )
            )
        );
    });

    it('returns undefined for a page that does not contain a recipe', () => {
        expect(scrap('')).toBeUndefined();
    });

    it('parses the recipe data from json.ld metadata', () => {
        const recipe = scrap(testCases['easyJsonLd']);

        expect(recipe).toBeDefined();
        expect(recipe).toMatchSnapshot();
    });

    it('parses the recipe data from itemprop markers', () => {
        const recipe = scrap(testCases['itemprops']);

        expect(recipe).toBeDefined();
        expect(recipe).toMatchSnapshot();
    });

    it('parses the recipe from raw html', () => {
        const recipe = scrap(testCases['hardWithSomeItemProps']);

        expect(recipe).toBeDefined();
        expect(recipe).toMatchSnapshot();
    });

    it.each([
        // 'benawad1',
        // 'benawad2',
        // 'benawad3',
        // 'benawad4',
        'benawad5',
        // 'benawad6',
        // 'benawad7',
        // 'benawad8',
        // 'benawad9',
        // 'benawad10',
    ])('works with examples from benawad blog', tcName => {
        const recipe = scrap(testCases[tcName]);

        expect(recipe).toBeDefined();
        expect(recipe).toMatchSnapshot();
    });
});
