import React, { useContext, useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, AsyncStorage } from "react-native";
import { 
    NavigationStackProp,
    NavigationStackScreenComponent 
} from "react-navigation-stack";
import { SpotifyContext } from '../providers/Spotify';
import { MusicControl } from '../providers/Spotify/Player';
import { Playlist, CreatePlaylistModal } from '../Playlist/Playlist';
import ActionBarImage from '../navigation/ActionBarImage';
import { IEvent } from '../models/Event';
import {baseServerUrl} from '../../secret';


// tslint:disable-next-line: interface-name
interface Props {
    navigation: NavigationStackProp<{name: string}>
}

const PlaylistScreen: NavigationStackScreenComponent<Props> = props => {
    const {spotify} = useContext(SpotifyContext);
    const {navigate} = props.navigation;
    const [visible, setVisible]= useState<boolean>(false);
    const [event, setEvent] = useState<IEvent>(undefined);

    const getEvent = async () => {
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
          setEvent(json);
        }
      }
    }

    useEffect(() => {
      // Get Event
      getEvent();
    }, [])
    return(
        <>
            <View style={styles.container}>
                <View style={styles.group}>
                    <View style={styles.rect}>
                        {event && <Text style={styles.partyName}>{event.name}</Text>}
                        <Text style={styles.hosts}>Hosts</Text>
                    </View>
                </View>
            </View>
            <MusicControl />
            
            {!spotify.getAccessToken() && <SpotifyButton />}
            <Playlist />
            <Button title ="Create Playlist" onPress={()=> {setVisible(!visible)}} />
            <CreatePlaylistModal visible={visible} setVisible={setVisible}/>
            
            {/*
            
            */}
        </>
    )
}
const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 200
    },
    group: {
      width: '100%',
      height: 200,
    },
    rect: {
      width: '100%',
      height: 200,
      backgroundColor: "#2d2d36",
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    partyName: {
      color: "#FFF",
      fontSize: 25,
      textAlign: 'center'
    },
    hosts: {
      color: "#ADADB1",
      fontSize: 20,
      textAlign: 'center'
    }
  });

PlaylistScreen.navigationOptions = {
    headerTitle: <ActionBarImage />,
    headerStyle:{
        height: 75,
        backgroundColor: '#33333D'
    }
  }
const SpotifyButton = props => {
    const {getAuthorizationCode} = useContext(SpotifyContext);
    return(
        <Button title="Login to Spotify" onPress={getAuthorizationCode}></Button>
    )
}

export default PlaylistScreen;
