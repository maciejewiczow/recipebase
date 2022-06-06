import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from 'recipebase/src/RootNavigation';
import { TileWrapper, TitleText, Wrapper } from './SelectionMethodModalView.styles';
import { FilesystemSelectionMethodButton } from './FilesystemSelectionMethodButton';
import { GDriveSelectionMethodButton } from './GDriveSelectionMethodButton';
import init from 'recipebase/src/store/Initalize';

export const SelectionMethodModalView: React.FC<NativeStackScreenProps<RootStackParams, 'SelectMethodModal'>> = ({ route, navigation }) => {
    const { selectWhat } = route.params;

    const onFileSelected = async (dbFilePath: string) => {
        navigation.goBack();
        await init.initalizeDbAndUpdateSavedFilePath(dbFilePath);
    };

    return (
        <Wrapper>
            <TitleText>{selectWhat === 'directory' ? 'Select new database location' : 'Select database'}</TitleText>
            <TileWrapper>
                <FilesystemSelectionMethodButton selectWhat={selectWhat} onFileSelected={onFileSelected} />
                <GDriveSelectionMethodButton selectWhat={selectWhat} onFileSelected={onFileSelected} />
            </TileWrapper>
        </Wrapper>
    );
};
