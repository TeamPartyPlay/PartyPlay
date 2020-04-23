import React, {FC, useState, useEffect} from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-elements';
import { Platform, Image } from 'react-native';
import * as Permissions from 'expo-permissions';

interface IEventImage {
    imageState: [ImagePicker.ImagePickerResult, React.Dispatch<React.SetStateAction<ImagePicker.ImagePickerResult>>],
}

const EventImage: FC<IEventImage> = ({ imageState }) => {
    const [image, setImage] = imageState;

    useEffect(() => {
        console.log(image);
    }, [image])

    useEffect(() => {
        getPermission();
    }, []);

    const getPermission = async () => {
        if (Platform.OS === "ios") {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
    }

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            if (result.cancelled === false) {
                setImage(result);
            }
          } catch (error) {
            console.log(error);
          }
    }

    return(
        <>

        <Button title="Upload Image" onPress={pickImage} />
        </>
    )
}

export default EventImage;