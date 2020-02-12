import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { Button } from "react-native";
import { 
    NavigationStackProp,
    NavigationStackScreenComponent 
} from "react-navigation-stack";
import { SpotifyContext } from '../providers/Spotify';
import { MusicControl } from '../providers/Spotify/Player';
import { Playlist, CreatePlaylistOverlay } from '../Playlist/Playlist';


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
            <MusicControl />
            {!spotify.getAccessToken() && <SpotifyButton />}
            <Playlist />
            
            {/*
            <Button title ="Create Playlist" onPress={()=> {setVisible(!visible)}} />
            <CreatePlaylistOverlay visible={visible} setVisible={setVisible}/>
            */}
        </>
    )
}

PlaylistScreen.navigationOptions = () => {
    return({
        title: "Playlist"
    })
}
const SpotifyButton = props => {
    const {getAuthorizationCode} = useContext(SpotifyContext);
    return(
        <Button title="Login to Spotify" onPress={getAuthorizationCode}></Button>
    )
}

export default PlaylistScreen;
