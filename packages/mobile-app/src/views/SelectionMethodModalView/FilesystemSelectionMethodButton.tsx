import React from 'react';
import { PermissionsAndroid, TouchableOpacity } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { AndroidScoped, Dirs, FileSystem, Util } from 'react-native-file-access';
import * as fs from 'react-native-scoped-storage';
import RNFetchBlob from 'rn-blob-fetch';
import { FileSelectionButtonProps, SelecMethodModalViewRouteProps } from './ViewProps';
import { FilesystemIcon, Tile, TileText } from './SelectionMethodModalView.styles';

export const FilesystemSelectionMethodButton: React.FC<
    SelecMethodModalViewRouteProps & FileSelectionButtonProps
> = ({ selectWhat, onFileSelected }) => {
    const pickFromFileSystem = async () => {
        const mimeType = 'application/octet-stream';

        const dirs = await fs.openDocumentTree(true);

        try {
            let fileUri: string;
            if (selectWhat === 'directory') {
                const file = await fs.createDocument('myRecipeDatabase.db', mimeType, '', 'base64');

                fileUri = file.uri;
            } else {
                const file = await fs.openDocument(true, 'base64');

                fileUri = file.uri;
            }

            fileUri = decodeURIComponent(fileUri);

            console.log(
                fileUri,
                Util.basename(fileUri),
                AndroidScoped.appendPath(Dirs.CacheDir, Util.basename(fileUri)),
            );

            console.log((await FileSystem.statDir(Dirs.CacheDir)).map(({ filename }) => filename));
            await FileSystem.cp(fileUri, Dirs.CacheDir);

            const statResult = await FileSystem.stat(Dirs.CacheDir + '/' + Util.basename(fileUri));

            console.log(statResult);

            // onFileSelected?.( statResult.path);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <TouchableOpacity onPress={pickFromFileSystem}>
            <Tile>
                <FilesystemIcon />
                <TileText>This device</TileText>
            </Tile>
        </TouchableOpacity>
    );
};
