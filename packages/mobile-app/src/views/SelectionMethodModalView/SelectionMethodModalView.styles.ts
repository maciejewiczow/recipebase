import EntypoIcon from 'react-native-vector-icons/Entypo';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import { css, styled } from 'styled-components/native';
import { createStyledIcon } from '~/utils/createStyledIcon';

export const Wrapper = styled.View`
    padding: 24px 32px;
    flex: 1;
`;

export const TitleText = styled.Text`
    color: ${({ theme }) => theme.palette.primary[0]};
    font-size: 32px;
`;

export const TileWrapper = styled.View`
    flex: 1;
    flex-flow: row nowrap;
    align-items: flex-start;
    margin-top: 32px;
`;

export const Tile = styled.View`
    border-radius: ${({ theme }) => theme.border.radiusSmall};
    elevation: 2;
    border: 1px solid #eee;
    width: 130px;
    background: white;
    margin-right: 12px;
    margin-bottom: 12px;
    align-items: center;
    padding: 16px;
`;

export const FilesystemIcon = createStyledIcon(
    OcticonsIcon,
    {
        name: 'file-directory',
        color: '#777',
        size: 56,
    },
    css`
        margin-bottom: 8px;
    `,
);

export const GDriveIcon = createStyledIcon(
    EntypoIcon,
    {
        name: 'google-drive',
        color: '#777',
        size: 56,
    },
    css`
        margin-bottom: 8px;
    `,
);

export const TileText = styled.Text`
    color: #555;
    text-align: center;
`;
