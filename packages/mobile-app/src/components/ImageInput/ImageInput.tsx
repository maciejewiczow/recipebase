import React, { useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-crop-picker';
import { useBottomSheetModal } from '~/utils/useBottomSheet';
import { BottomSheetModal } from '../BottomSheetModal';
import {
    CameraIcon,
    ClearIcon,
    CropIcon,
    GalleryIcon,
    Label,
    OptionName,
    OptionsList,
    OptionWrapper,
    PickedImage,
    PickImageButton,
    Placeholder,
    PlusIcon,
    Wrapper,
} from './ImageInput.styles';

interface ImageInputProps {
    label?: string;
    value: string | undefined;
    onChange: (val: string | undefined) => void;
    placeholder?: string;
    style?: StyleProp<ViewStyle>;
}

const pickerOptions: ImagePicker.Options = {
    freeStyleCropEnabled: true,
    cropping: true,
    mediaType: 'photo',
    includeBase64: true,
};

export const ImageInput: React.FC<ImageInputProps> = ({
    label,
    placeholder = 'Add image',
    value,
    onChange,
    style,
}) => {
    const { props: modalProps, bottomSheetModal } = useBottomSheetModal({ height: '25%' });
    const [imagePath, setImagePath] = useState<string>();

    const triggerFilePicker = async () => {
        try {
            const res = await ImagePicker.openPicker(pickerOptions);

            setImagePath(res.path);
            onChange(`data:${res.mime};base64,${res.data}`);
        } catch (e) {
            console.log(e);
        }
    };

    const triggerCamera = async () => {
        try {
            const res = await ImagePicker.openCamera(pickerOptions);

            setImagePath(res.path);
            onChange(`data:${res.mime};base64,${res.data}`);
        } catch (e) {
            console.log(e);
        }
    };

    const triggerCropper = async () => {
        if (!imagePath) {
            return;
        }

        try {
            const res = await ImagePicker.openCropper({
                ...pickerOptions,
                path: imagePath,
            });

            onChange(`data:${res.mime};base64,${res.data}`);
        } catch (e) {
            console.log(e);
        }
    };

    const openMethodPicker = () => bottomSheetModal.open();

    return (
        <Wrapper style={style}>
            {label && <Label>{label}</Label>}
            {!value ? (
                <PickImageButton
                    onPress={openMethodPicker}
                    rightIcon={<PlusIcon />}
                >
                    <Placeholder>{placeholder}</Placeholder>
                </PickImageButton>
            ) : (
                <TouchableOpacity onPress={openMethodPicker}>
                    <PickedImage
                        resizeMode="cover"
                        source={{ uri: value }}
                    />
                </TouchableOpacity>
            )}
            <BottomSheetModal {...modalProps}>
                <OptionsList>
                    <OptionWrapper
                        onPress={() => {
                            triggerFilePicker();
                            bottomSheetModal.close();
                        }}
                    >
                        <GalleryIcon />
                        <OptionName>Gallery</OptionName>
                    </OptionWrapper>
                    <OptionWrapper
                        onPress={() => {
                            triggerCamera();
                            bottomSheetModal.close();
                        }}
                    >
                        <CameraIcon />
                        <OptionName>Camera</OptionName>
                    </OptionWrapper>
                    {imagePath && (
                        <OptionWrapper
                            onPress={() => {
                                triggerCropper();
                                bottomSheetModal.close();
                            }}
                        >
                            <CropIcon />
                            <OptionName>Crop</OptionName>
                        </OptionWrapper>
                    )}
                    {value !== undefined && (
                        <OptionWrapper
                            onPress={() => {
                                onChange(undefined);
                                setImagePath(undefined);
                                bottomSheetModal.close();
                            }}
                        >
                            <ClearIcon />
                            <OptionName>Clear</OptionName>
                        </OptionWrapper>
                    )}
                </OptionsList>
            </BottomSheetModal>
        </Wrapper>
    );
};
