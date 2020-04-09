import React, { useContext, useState } from 'react';
import { Button, View, Text, StyleSheet } from "react-native";
import { 
    NavigationStackProp,
    NavigationStackScreenComponent 
} from "react-navigation-stack";
import { SpotifyContext } from '../providers/Spotify';
import { MusicControl } from '../providers/Spotify/Player';
import { Playlist, CreatePlaylistModal } from '../Playlist/Playlist';
import ActionBarImage from '../navigation/ActionBarImage';


// tslint:disable-next-line: interface-name
interface Props {
    navigation: NavigationStackProp<{name: string}>
}

const PlaylistScreen: NavigationStackScreenComponent<Props> = props => {
    const {spotify} = useContext(SpotifyContext);
    const {navigate} = props.navigation;
    const [visible, setVisible]= useState<boolean>(false);
    return(
        <>
            <View style={styles.container}>
                <View style={styles.group}>
                    <View style={styles.rect}>
                        <Text style={styles.partyName}>Party Name</Text>
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
