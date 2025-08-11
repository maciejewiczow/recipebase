type User = {};

export interface GDriveFilePickerViewProps {
    userInfo: User & { accessToken: string };
    currentFolderId?: string;
}
