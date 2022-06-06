import { User } from '@react-native-google-signin/google-signin';

export interface GDriveFilePickerViewProps {
    userInfo: User & { accessToken: string };
    currentFolderId?: string;
}
