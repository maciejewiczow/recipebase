import React from 'react';
import { ToastAndroid, TouchableOpacity } from 'react-native';
import {
    GoogleSignin,
    statusCodes,
    NativeModuleError,
    User,
} from '@react-native-google-signin/google-signin';
import { Tile, GDriveIcon, TileText } from './SelectionMethodModalView.styles';
import { FileSelectionButtonProps, SelecMethodModalViewRouteProps } from './ViewProps';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '~/RootNavigation';

export const GDriveSelectionMethodButton: React.FC<
    SelecMethodModalViewRouteProps & FileSelectionButtonProps
> = ({ selectWhat, onFileSelected }) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();

            let userInfo: User;
            if (await GoogleSignin.isSignedIn()) userInfo = await GoogleSignin.signInSilently();
            else userInfo = await GoogleSignin.signIn();

            console.log(userInfo); // just to see if things are working
            console.log('Successful login');
            navigation.navigate('GDriveFilePicker', {
                userInfo: {
                    ...userInfo,
                    accessToken: (await GoogleSignin.getTokens()).accessToken,
                },
            });
        } catch (error) {
            const err = error as NativeModuleError;

            if (err.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log('sign in cancelled');
            } else if (err.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log('in progress ');
                ToastAndroid.show('Sign in already in progress', ToastAndroid.SHORT);
            } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log('play services not available');
                ToastAndroid.show('Play Services are not available or outdated', ToastAndroid.SHORT);
            } else {
                // some other error happened
                console.log('some error happened');
                console.log(error);
            }
        }
    };

    return (
        <TouchableOpacity onPress={signIn}>
            <Tile>
                <GDriveIcon />
                <TileText>Google drive</TileText>
            </Tile>
        </TouchableOpacity>
    );
};
