import React from 'react';
import { EmptyListTitle, NoResultsWrapper } from './HomeView.styles';

export const NoSearchResultsListView: React.FC = () => (
    <NoResultsWrapper>
        <EmptyListTitle>Nothing matches your search criteria</EmptyListTitle>
    </NoResultsWrapper>
);
