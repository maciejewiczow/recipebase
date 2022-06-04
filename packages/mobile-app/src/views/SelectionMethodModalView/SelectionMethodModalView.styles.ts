import styled from 'styled-components/native';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

export const Wrapper = styled.View`
    padding: 24px 32px;
    flex: 1;
`;

export const TitleText = styled.Text`
    color: ${({ theme }) => theme.palette.primaryAccent};
    font-size: 32px;
`;

export const TileWrapper = styled.View`
    flex: 1;
    flex-flow: row nowrap;
    align-items: flex-start;
    margin-top: 32px;
`;

export const Tile = styled.View`
    border-radius: 7px;
    border: 1px solid #eee;
    width: 130px;
    background: white;
    margin-right: 12px;
    margin-bottom: 12px;
    align-items: center;
    padding: 16px;
`;

export const FilesystemIcon = styled(OcticonsIcon).attrs({
    name: 'file-directory',
    color: '#777',
    size: 56,
})`
    margin-bottom: 8px;
`;

export const GDriveIcon = styled(EntypoIcon).attrs({
    name: 'google-drive',
    color: '#777',
    size: 56,
})`
    margin-bottom: 8px;
`;

export const TileText = styled.Text`
    color: #555;
    text-align: center;
`;
