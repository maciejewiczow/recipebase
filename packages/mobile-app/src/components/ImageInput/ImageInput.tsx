import React from 'react';
import { PermissionsAndroid, Platform, StyleProp, TouchableNativeFeedback, ViewStyle } from 'react-native';
import RNBlobFetch from 'rn-blob-fetch';
import { pickSingle } from 'react-native-document-picker';
import { Button } from '../Button';
import { Wrapper, Label, Input, Placeholder, PlusIcon, PickedImage } from './ImageInput.styles';

interface ImageInputProps {
    label?: string;
    value?: string;
    onChange?: (val: string) => any;
    placeholder?: string;
    style?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<ViewStyle>;
}

export const ImageInput: React.FC<ImageInputProps> = ({
    label,
    placeholder = 'Pick an image',
    value,
    onChange,
    style,
    inputStyle,
}) => {
    const triggerFilePicker = async () => {
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

            const res = await pickSingle({
                presentationStyle: 'fullScreen',
                type: ['image/jpeg', 'image/png'],
            });

            const statResult = await RNBlobFetch.fs.stat(res.uri);
            const file: string = await RNBlobFetch.fs.readFile(statResult.path, 'base64');

            onChange?.(`data:${res.type};base64,${file}`);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Wrapper style={style}>
            <Label>{label}</Label>
            {!value ? (
                <TouchableNativeFeedback onPress={triggerFilePicker}>
                    <Input style={inputStyle}>
                        <Placeholder>{placeholder}</Placeholder>
                        <PlusIcon />
                    </Input>
                </TouchableNativeFeedback>
            ) : (
                <>
                    <PickedImage
                        resizeMode="cover"
                        source={{ uri: value }}
                    />
                    <Button
                        onPress={triggerFilePicker}
                        style={{
                            minHeight: 60,
                        }}
                        variant="secondary"
                    >
                        Replace
                    </Button>
                </>
            )}
        </Wrapper>
    );
};
