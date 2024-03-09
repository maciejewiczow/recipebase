import React, { useEffect, useMemo, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
    GDrive,
    ListQueryBuilder,
    FilesResponse,
} from '@robinbobin/react-native-google-drive-api-wrapper';
import { Button } from '~/components/Button';
import { RootStackParams } from '~/RootNavigation';
import {
    Bottom,
    Files,
    Header,
    HeaderText,
    Wrapper,
} from './GDriveFilePickerView.styles';

export const GDriveFilePickerView: React.FC<
    NativeStackScreenProps<RootStackParams, 'GDriveFilePicker'>
> = ({ navigation, route }) => {
    const gdrive = useMemo(() => {
        const gd = new GDrive();
        gd.accessToken = route.params.userInfo.accessToken;
        return gd;
    }, [route.params.userInfo.accessToken]);

    const [files, setFiles] = useState<FilesResponse | null>(null);

    useEffect(() => {
        (async () => {
            setFiles(
                (await gdrive.files.list({
                    q: new ListQueryBuilder().in(
                        route.params.currentFolderId || 'root',
                        'parent',
                    ),
                })) as FilesResponse,
            );
        })();
    }, [gdrive.files, route.params.currentFolderId]);

    return (
        <Wrapper>
            <Header>
                <HeaderText>Pick a file</HeaderText>
            </Header>
            <Files></Files>
            <Bottom>
                <Button variant="primary">Select</Button>
            </Bottom>
        </Wrapper>
    );
};
