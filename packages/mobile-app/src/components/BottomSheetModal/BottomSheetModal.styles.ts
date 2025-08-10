import { BottomSheetModal as OriginalBottomSheetModal } from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';

export const BottomSheetModal = styled(OriginalBottomSheetModal).attrs(({ theme }) => ({
    backgroundStyle: {
        backgroundColor: theme.palette.background[2],
    },
    handleIndicatorStyle: {
        backgroundColor: theme.palette.gray[0],
        width: 104,
    },
}))``;
