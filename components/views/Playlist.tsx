import React, { useContext, useState, useEffect } from 'react';
import { Button, View } from "react-native";
import { 
    NavigationStackProp,
    NavigationStackScreenComponent 
} from "react-navigation-stack";
import { SpotifyContext, PlayerContext } from '../providers/Spotify';
import { MusicControl } from '../providers/Spotify/Player';
import { Ionicons } from '@expo/vector-icons';

// tslint:disable-next-line: interface-name
interface Props {
    navigation: NavigationStackProp<{name: string}>
}

const PlaylistScreen: NavigationStackScreenComponent<Props> = props => {
    const {spotify, refresh} = useContext(SpotifyContext);
    const {navigate} = props.navigation;

    return(
        <>
            <Button title="Refresh Tokens" onPress={refresh} />

            <MusicControl />

            {!spotify.getAccessToken() && <SpotifyButton />}
        </>
    )
}

const refreshButton: React.FC<any> = props => {
    const {refresh} = useContext(SpotifyContext);
    return(
        <Ionicons name="md-refresh" size={25} style={{marginRight: 10}} onPress={refresh}/>
    );
}

PlaylistScreen.navigationOptions = {
    headerRight: () => <Ionicons name="md-refresh" size={25} style={{marginRight: 10}} />,
    title: "Playlist"
}

const SpotifyButton = props => {
    const {getAuthorizationCode} = useContext(SpotifyContext);
    return(
        <Button title="Login to Spotify" onPress={getAuthorizationCode}></Button>
    )
}

export default PlaylistScreen;
