import { ComponentProps } from 'react';
import { SectionList } from 'react-native';
import { RecipeIngredient } from 'backend-logic';

export interface Section {
    title: string;
}

export type SectionListData = Defined<
    ComponentProps<typeof SectionList<RecipeIngredient, Section>>['sections']
>;
