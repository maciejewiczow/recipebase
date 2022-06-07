import React from 'react';
import { EmptyListSubtitle, NoResultsWrapper } from './HomeView.styles';

export const NoSearchResultsListView: React.FC = () => (
    <NoResultsWrapper>
        <EmptyListSubtitle>Nothing matches your search criteria</EmptyListSubtitle>
    </NoResultsWrapper>
);
