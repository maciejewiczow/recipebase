import React from 'react';
import { PermissionsAndroid, Platform, ToastAndroid, TouchableOpacity } from 'react-native';
import { DocumentPickerOptions, pickDirectory, pickSingle } from 'react-native-document-picker';
import { SupportedPlatforms } from 'react-native-document-picker/lib/typescript/fileTypes';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { FileSelectionButtonProps, SelecMethodModalViewRouteProps } from './ViewProps';
import { FilesystemIcon, Tile, TileText } from './SelectionMethodModalView.styles';
import RNBlobFetch from 'rn-blob-fetch';

export const FilesystemSelectionMethodButton: React.FC<SelecMethodModalViewRouteProps & FileSelectionButtonProps> = ({ selectWhat, onFileSelected }) => {
    const pickFromFileSystem = async () => {
        const opts: DocumentPickerOptions<SupportedPlatforms> = {
            presentationStyle: 'fullScreen',
            type: 'application/octet-stream',
        };

        try {
            if (Platform.OS === 'android') {
                const res = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                ]);

                if (Object.values(res).find(status => status !== 'granted')) {
                    console.log('permission denied', res);
                    return;
                }
            }

            let dbFilePath: string;
            if (selectWhat === 'directory') {
                const directory = await pickDirectory(opts);

                if (!directory)
                    return;

                directory.uri = decodeURIComponent(directory.uri);

                console.log(directory);

                if (!directory.uri.startsWith('content://com.android.externalstorage.documents/tree/primary:')) {
                    ToastAndroid.show('This location is not currently supported :(', ToastAndroid.LONG);
                    return;
                }

                dbFilePath = directory.uri.replace('content://com.android.externalstorage.documents/tree/primary:', '/storage/emulated/0/');

                if (!dbFilePath.endsWith('/'))
                    dbFilePath += '/';

                dbFilePath += 'recipebase.db';
                console.log(dbFilePath);

                await ReactNativeBlobUtil.fs.createFile(dbFilePath, '', 'utf8');
            } else {
                const file = await pickSingle(opts);

                file.uri = decodeURIComponent(file.uri);

                console.log(file);

                const statResult = await RNBlobFetch.fs.stat(file.uri);

                console.log(statResult);

                dbFilePath = statResult.path;
            }

            onFileSelected?.(dbFilePath);
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
