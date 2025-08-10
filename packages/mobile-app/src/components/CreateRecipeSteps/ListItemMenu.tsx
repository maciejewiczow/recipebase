import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { useTheme } from 'styled-components/native';
import { EditIcon, EditIconWrapper, MenuItemText, MenuItemWrapper } from './common.styles';

interface ListItemMenuProps {
    style?: StyleProp<ViewStyle>;
    onEditPress: () => void;
    onRemovePress: () => void;
}

export const ListItemMenu: React.FC<ListItemMenuProps> = ({ onEditPress, onRemovePress, style }) => {
    const theme = useTheme();

    return (
        <EditIconWrapper style={style}>
            <Menu>
                <MenuTrigger>
                    <EditIcon />
                </MenuTrigger>
                <MenuOptions
                    optionsContainerStyle={{
                        backgroundColor: theme.palette.background[1],
                    }}
                >
                    <MenuOption onSelect={onEditPress}>
                        <MenuItemWrapper>
                            <MenuItemText>Edit</MenuItemText>
                        </MenuItemWrapper>
                    </MenuOption>
                    <MenuOption onSelect={onRemovePress}>
                        <MenuItemWrapper>
                            <MenuItemText>Remove</MenuItemText>
                        </MenuItemWrapper>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </EditIconWrapper>
    );
};
