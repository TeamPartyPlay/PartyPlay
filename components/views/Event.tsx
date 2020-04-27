import React, { useState, useContext } from 'react';
import { Text, View, Button, AsyncStorage, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NavigationStackProp, NavigationStackScreenComponent  } from "react-navigation-stack";
import { Input, CheckBox } from 'react-native-elements';
import { DateTime, Tags } from '../Event/AddForm';
import EventImage from '../Event/AddForm/EventImage';
import { ImagePickerResult } from  'expo-image-picker';
import Theme from '../providers/Theme';
import {baseServerUrl} from '../../secret';
import { ScrollView } from 'react-native-gesture-handler';


// tslint:disable-next-line: interface-name
interface EventScreenProps {
    navigation: NavigationStackProp<{name: string}>
}

const EventScreen: NavigationStackScreenComponent<EventScreenProps> = props => {
    // const {} = useContext() TODO: UserContext
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [start, setStart] = useState<Date>(new Date());
    const [end, setEnd] = useState<Date>();
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>([]);
    const [image, setImage] = useState<ImagePickerResult>();

    const clearForm = () => {
        setName("");
        setDescription("");
        setStart(new Date());
        setEnd(undefined);
        setIsPublic(false);
        setTags([]);
    }

    const submitImage = async (id: string) => {
        let data = new FormData();
        if(image?.cancelled === false) {
            const splitUri = image.uri.split(/[\/\.]/);
            const type = splitUri.pop();
            const name = splitUri.pop();
            data.append('file', {
                uri: image.uri,
                type: `${image.type}/${type}`,
                name: name+type,
            });
            // data.append('eventId', id);
            const res = await fetch(`${baseServerUrl}/api/event/image`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: data
            });
        }
    }

    const onSubmit = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const res = await fetch('https://partyplayserver.herokuapp.com/api/event', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    // tslint:disable-next-line: object-literal-sort-keys
                    description,
                    lat: 0,
                    lng: 0,
                    start,
                    end,
                    isPublic,
                    tags,
                    token: userToken
                })
            })
            if(res.status === 200){
                const json =  await res.json();
                // await submitImage(json._id);
                clearForm();
                props.navigation.goBack();
            }
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <ScrollView style={{flex: 1, flexDirection: "column"}}>
        {image?.cancelled === false && (
            <Image 
                source={{uri: image.uri}}
                style={{
                    width: 200,
                    height: 200,
                    alignSelf: "center"
                }}
            />
        )}
            <View>
            <Input
                placeholder="Name" 
                label="Name"
                value={name} 
                onChangeText={text => setName(text)}
                style={{height: 300}}
            />
            </View>

            <Input
                placeholder="Description" 
                label="Description"
                value={description} 
                onChangeText={text => setDescription(text)}
            />
            <CheckBox 
                title="Is Public" 
                containerStyle={{backgroundColor: 'transparent', borderWidth: 0,}}
                center
                textStyle= {{color: 'white', fontSize: 20}}
                checked={isPublic} 
                onPress={() => setIsPublic(!isPublic)}
            />
    
            <DateTime dateTimeState={[start, setStart]} />
            <Tags state={[tags, setTags]}/>
            <EventImage imageState={[image, setImage]}/>
            <TouchableOpacity style={[styles.containerSubmit, styles.materialButtonDark]} onPress={onSubmit}>
                <Text style={{}}>Create Party</Text>
            </TouchableOpacity>
        </ScrollView>
            
    )

}
const styles = StyleSheet.create({
    containerSubmit: {
        backgroundColor: "#212121",
        position: 'absolute',
        bottom: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 16,
        paddingLeft: 16,
        elevation: 2,
        minWidth: 88,
        borderRadius: 2,
        shadowOffset: {
            height: 5,
            width: 5
        },
        shadowColor: "#000",
        shadowOpacity: 0.35,
        shadowRadius: 5
    },
    materialButtonDark: {
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        height: 36,
        backgroundColor: "rgba(41,180,115,1)",
        borderRadius: 100,
        shadowOffset: {
          height: 5,
          width: 5
        },
        shadowColor: "rgba(0,0,0,1)",
        shadowOpacity: 0.3,
        marginTop: 22,
        paddingBottom: 10,
    },
    
});

EventScreen.navigationOptions = {
    headerTitle: "Add An Event",
    headerStyle:{
        height: 75,
        backgroundColor: Theme.colors.primary,
    }
  }

export default EventScreen;