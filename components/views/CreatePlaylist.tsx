import React, { useState, useContext, useEffect } from 'react';
import { Text, View, AsyncStorage, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationStackProp, NavigationStackScreenComponent  } from "react-navigation-stack";
import { Input } from 'react-native-elements';
import Theme from '../providers/Theme';
import {baseServerUrl} from '../../secret';
import { ScrollView } from 'react-native-gesture-handler';
import { PlaylistContext } from '../providers/Spotify';
import { IEvent } from '../models/Event';


// tslint:disable-next-line: interface-name
interface Props {
    navigation: NavigationStackProp<{name: string}>
}

const CreatePlaylistScreen: NavigationStackScreenComponent<Props> = props => {
    const {createPlaylist, clearPlaylist, currentPlaylist} = useContext(PlaylistContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const getEvent = async () : Promise<IEvent> => {
        const token = await AsyncStorage.getItem('userToken');
        const eventToken = await AsyncStorage.getItem('eventToken');
        const url = `${baseServerUrl}/api/event?token=${token}&eventToken=${eventToken}`
        if(token && eventToken){
          const res = await fetch(url, {
            method:'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          })
          if(res.status === 200){
            const json = await res.json();
            console.log(json)
            return json;
          }
        }
      }

    const clearForm = () => {
        setName("");
        setDescription("");
    }

    useEffect(() => {
        getEvent().then(event => {
            if(event.playlist){
                props.navigation.goBack();
            }
        })
    }, []);


    const onSubmit = async () => {
        try {
            const spotifyOpts = {
                description,
                name,
                collaborative: true,
                public: false,
            }
            const userToken = await AsyncStorage.getItem('userToken');
            const eventToken = await AsyncStorage.getItem('eventToken');
            const playlist = await createPlaylist(spotifyOpts);
            if(playlist){
                const res = await fetch('https://partyplayserver.herokuapp.com/api/playlist', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        spotifyId: playlist.id,
                        token: userToken,
                        eventToken
                    })
                })
                if(res.status === 200){
                    const json =  await res.json();
                    clearForm();
                    props.navigation.goBack();
                }
            }

        } catch (error) {
            console.error(error);
        }
    }
    return(
        <ScrollView style={{flex: 1, flexDirection: "column"}}>
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
            <View>
                <TouchableOpacity style={[styles.containerSubmit, styles.materialButtonDark]} onPress={onSubmit}>
                    <Text style={{}}>Create Playlist</Text>
                </TouchableOpacity>
            </View>

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

CreatePlaylistScreen.navigationOptions = {
    headerTitle: "Create A Playlist",
    headerStyle:{
        height: 75,
        backgroundColor: Theme.colors.primary,
    }
  }

export default CreatePlaylistScreen;