import React, { useContext, useState, useEffect } from 'react';
import { Button, View } from "react-native";
import { 
    NavigationStackProp,
    NavigationStackScreenComponent 
} from "react-navigation-stack";
import { SpotifyContext, PlayerContext } from '../providers';
import { MusicControl } from '../providers/Player';
import { Ionicons } from '@expo/vector-icons';

// tslint:disable-next-line: interface-name
interface Props {
    navigation: NavigationStackProp<{name: string}>
}

const PlaylistScreen: NavigationStackScreenComponent<Props> = props => {
    const {spotify, refresh} = useContext(SpotifyContext);
    const {play, pause} = useContext(PlayerContext);
    const {navigate} = props.navigation;

    return(
        <>
            {/*
                The Play and Pause feature requires a target device if there is no current device
            */}
            <Button title="Play" onPress={play} />
            <Button title="Pause" onPress={pause} />
            <Button title="Skip Song" onPress={()=>spotify.skipToNext()} />
            <Button title="Previous Song" onPress={()=>spotify.skipToPrevious()} />
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
