import { Recipe } from 'recipe';
import { HTMLElement } from 'node-html-parser';

export type Strategy = (document: HTMLElement) => Partial<Recipe>;
