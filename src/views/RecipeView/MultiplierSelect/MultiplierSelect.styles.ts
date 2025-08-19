import styled from 'styled-components/native';
import { BottomSheetSelect } from '~/components/BottomSheetSelect';
import { TextBase } from '~/components/Text';
import { DownChevronSvg } from './DownChevronSvg';

export const Select = styled(BottomSheetSelect).attrs({
    valueFontWeight: 'medium',
    inputStyle: {
        paddingTop: 14,
        paddingBottom: 14,
        paddingRight: 32,
    },
})`
    min-width: 100px;
` as typeof BottomSheetSelect;

export const ChevronDown = styled(DownChevronSvg)`
    position: absolute;
    right: 18px;
    pointer-events: none;
`;

export const Value = styled(TextBase).attrs({
    fontWeight: 'medium',
})``;
