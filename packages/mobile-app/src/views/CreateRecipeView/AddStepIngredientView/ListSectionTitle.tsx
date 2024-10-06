import React from 'react';
import { SectionTitle, SectionTitleWrapper } from './AddStepIngredientView.styles';

interface ListSectionTitleProps {
    title: string;
    listDataLength: number;
}

export const ListSectionTitle: React.FC<ListSectionTitleProps> = ({ title, listDataLength }) => {
    if (listDataLength < 2) {
        return null;
    }

    return (
        <SectionTitleWrapper>
            <SectionTitle>{title}</SectionTitle>
        </SectionTitleWrapper>
    );
};
