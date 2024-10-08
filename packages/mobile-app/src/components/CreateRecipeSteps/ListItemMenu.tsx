import React from 'react';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { EditIcon, EditIconWrapper, MenuItemText, MenuItemWrapper } from './common.styles';

interface ListItemMenuProps {
    onEditPress: () => void;
    onRemovePress: () => void;
}

export const ListItemMenu: React.FC<ListItemMenuProps> = ({ onEditPress, onRemovePress }) => (
    <EditIconWrapper>
        <Menu>
            <MenuTrigger>
                <EditIcon />
            </MenuTrigger>
            <MenuOptions>
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
