import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Input, InputWrapper, SearchIcon } from './SearchBar.styles';

export interface SearchBarProps {
    placeholder?: string;
    style?: StyleProp<ViewStyle>;
    onChange: (searchText: string) => any;
    searchText: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    style,
    placeholder,
    searchText,
    onChange,
}) => (
    <InputWrapper style={style}>
        <SearchIcon />
        <Input
            placeholder={placeholder}
            value={searchText}
            onChangeText={onChange}
        />
    </InputWrapper>
);
