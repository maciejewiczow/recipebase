import '@robinbobin/react-native-google-drive-api-wrapper';

declare module '@robinbobin/react-native-google-drive-api-wrapper' {
    export interface FilesResponse {
        kind: 'drive#fileList';
        nextPageToken: string;
        incompleteSearch: boolean;
        files: FileResource[];
    }

    export interface AboutResource {
        kind: 'drive#about';
        user: {
            kind: 'drive#user';
            displayName: string;
            photoLink: string;
            me: boolean;
            permissionId: string;
            emailAddress: string;
        };
        storageQuota: {
            limit: number;
            usage: number;
            usageInDrive: number;
            usageInDriveTrash: number;
        };
        importFormats: Record<string, string>;
        exportFormats: Record<string, string>;
        maxImportSizes: Record<string, number>;
        maxUploadSize: number;
        appInstalled: boolean;
        folderColorPalette: string[];
        teamDriveThemes: {
            id: string;
            backgroundImageLink: string;
            colorRgb: string;
        }[];
        driveThemes: {
            id: string;
            backgroundImageLink: string;
            colorRgb: string;
        }[];
        canCreateTeamDrives: boolean;
        canCreateDrives: boolean;
    }

    export interface FileResource {
        kind: 'drive#file';
        id: string;
        name: string;
        mimeType: string;
        description: string;
        starred: boolean;
        trashed: boolean;
        explicitlyTrashed: boolean;
        trashingUser: {
            kind: 'drive#user';
            displayName: string;
            photoLink: string;
            me: boolean;
            permissionId: string;
            emailAddress: string;
        };
        trashedTime: Date;
        parents: [string];
        properties: {
            [key: string]: string;
        };
        appProperties: {
            [key: string]: string;
        };
        spaces: [string];
        version: number;
        webContentLink: string;
        webViewLink: string;
        iconLink: string;
        hasThumbnail: boolean;
        thumbnailLink: string;
        thumbnailVersion: number;
        viewedByMe: boolean;
        viewedByMeTime: Date;
        createdTime: Date;
        modifiedTime: Date;
        modifiedByMeTime: Date;
        modifiedByMe: boolean;
        sharedWithMeTime: Date;
        sharingUser: {
            kind: 'drive#user';
            displayName: string;
            photoLink: string;
            me: boolean;
            permissionId: string;
            emailAddress: string;
        };
        owners: {
            kind: 'drive#user';
            displayName: string;
            photoLink: string;
            me: boolean;
            permissionId: string;
            emailAddress: string;
        }[];
        teamDriveId: string;
        driveId: string;
        lastModifyingUser: {
            kind: 'drive#user';
            displayName: string;
            photoLink: string;
            me: boolean;
            permissionId: string;
            emailAddress: string;
        };
        shared: boolean;
        ownedByMe: boolean;
        capabilities: {
            canAcceptOwnership: boolean;
            canAddChildren: boolean;
            canAddFolderFromAnotherDrive: boolean;
            canAddMyDriveParent: boolean;
            canChangeCopyRequiresWriterPermission: boolean;
            canChangeSecurityUpdateEnabled: boolean;
            canChangeViewersCanCopyContent: boolean;
            canComment: boolean;
            canCopy: boolean;
            canDelete: boolean;
            canDeleteChildren: boolean;
            canDownload: boolean;
            canEdit: boolean;
            canListChildren: boolean;
            canModifyContent: boolean;
            canModifyContentRestriction: boolean;
            canMoveChildrenOutOfTeamDrive: boolean;
            canMoveChildrenOutOfDrive: boolean;
            canMoveChildrenWithinTeamDrive: boolean;
            canMoveChildrenWithinDrive: boolean;
            canMoveItemIntoTeamDrive: boolean;
            canMoveItemOutOfTeamDrive: boolean;
            canMoveItemOutOfDrive: boolean;
            canMoveItemWithinTeamDrive: boolean;
            canMoveItemWithinDrive: boolean;
            canMoveTeamDriveItem: boolean;
            canReadRevisions: boolean;
            canReadTeamDrive: boolean;
            canReadDrive: boolean;
            canRemoveChildren: boolean;
            canRemoveMyDriveParent: boolean;
            canRename: boolean;
            canShare: boolean;
            canTrash: boolean;
            canTrashChildren: boolean;
            canUntrash: boolean;
        };
        viewersCanCopyContent: boolean;
        copyRequiresWriterPermission: boolean;
        writersCanShare: boolean;
        permissions: PermissionsResource[];
        permissionIds: string[];
        hasAugmentedPermissions: boolean;
        folderColorRgb: string;
        originalFilename: string;
        fullFileExtension: string;
        fileExtension: string;
        md5Checksum: string;
        size: number;
        quotaBytesUsed: number;
        headRevisionId: string;
        contentHints: {
            thumbnail: {
                image: Buffer;
                mimeType: string;
            };
            indexableText: string;
        };
        imageMediaMetadata: {
            width: number;
            height: number;
            rotation: number;
            location: {
                latitude: number;
                numberitude: number;
                altitude: number;
            };
            time: string;
            cameraMake: string;
            cameraModel: string;
            exposureTime: number;
            aperture: number;
            flashUsed: boolean;
            focalLength: number;
            isoSpeed: number;
            meteringMode: string;
            sensor: string;
            exposureMode: string;
            colorSpace: string;
            whiteBalance: string;
            exposureBias: number;
            maxApertureValue: number;
            subjectDistance: number;
            lens: string;
        };
        videoMediaMetadata: {
            width: number;
            height: number;
            durationMillis: number;
        };
        isAppAuthorized: boolean;
        exportLinks: {
            [key: string]: string;
        };
        shortcutDetails: {
            targetId: string;
            targetMimeType: string;
            targetResourceKey: string;
        };
        contentRestrictions: {
            readOnly: boolean;
            reason: string;
            restrictingUser: {
                kind: 'drive#user';
                displayName: string;
                photoLink: string;
                me: boolean;
                permissionId: string;
                emailAddress: string;
            };
            restrictionTime: Date;
            type: string;
        }[];
        resourceKey: string;
        linkShareMetadata: {
            securityUpdateEligible: boolean;
            securityUpdateEnabled: boolean;
        };
    }

    export interface PermissionsResource {
        kind: 'drive#permission';
        id: string;
        type: string;
        emailAddress: string;
        domain: string;
        role: string;
        view: string;
        allowFileDiscovery: boolean;
        displayName: string;
        photoLink: string;
        expirationTime: Date;
        teamDrivePermissionDetails: [
            {
                teamDrivePermissionType: string;
                role: string;
                inheritedFrom: string;
                inherited: boolean;
            },
        ];
        permissionDetails: [
            {
                permissionType: string;
                role: string;
                inheritedFrom: string;
                inherited: boolean;
            },
        ];
        deleted: boolean;
        pendingOwner: boolean;
    }
}
