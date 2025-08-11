import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
    DeleteSectionIcon,
    DeleteSectionIconWrapper,
    SectionNameInput,
    SectionNameInputRow,
} from './common.styles';

interface SectionHeaderProps {
    style?: StyleProp<ViewStyle>;
    onSectionNameChange?: (name: string) => void;
    sectionName?: string;
    onSectionDeletePress?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    style,
    onSectionDeletePress,
    onSectionNameChange,
    sectionName,
}) => (
    <SectionNameInputRow style={style}>
        <SectionNameInput
            label="Section name"
            value={sectionName}
            onChange={onSectionNameChange}
        />
        <DeleteSectionIconWrapper onPress={onSectionDeletePress}>
            <DeleteSectionIcon />
        </DeleteSectionIconWrapper>
    </SectionNameInputRow>
);
