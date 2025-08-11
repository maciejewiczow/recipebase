import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '~/RootNavigation';
import { useRootStore } from '~/RootStoreContext';
import { FilesystemSelectionMethodButton } from './FilesystemSelectionMethodButton';
import { GDriveSelectionMethodButton } from './GDriveSelectionMethodButton';
import { TileWrapper, TitleText, Wrapper } from './SelectionMethodModalView.styles';

export const SelectionMethodModalView: React.FC<
    NativeStackScreenProps<RootStackParams, 'SelectMethodModal'>
> = ({ route, navigation }) => {
    const root = useRootStore();

    const { selectWhat } = route.params;

    const onFileSelected = async (dbFilePath: string) => {
        navigation.goBack();
        await root.initalizeDbAndUpdateSavedFilePath(dbFilePath);
    };

    return (
        <Wrapper>
            <TitleText>
                {selectWhat === 'directory' ? 'Select new database location' : 'Select database'}
            </TitleText>
            <TileWrapper>
                <FilesystemSelectionMethodButton
                    selectWhat={selectWhat}
                    onFileSelected={onFileSelected}
                />
                <GDriveSelectionMethodButton
                    selectWhat={selectWhat}
                    onFileSelected={onFileSelected}
                />
            </TileWrapper>
        </Wrapper>
    );
};
