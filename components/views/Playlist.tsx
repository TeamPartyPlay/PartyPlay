import React, { useContext, useState, useEffect } from 'react';
import { Button } from "react-native";
import { 
    NavigationStackProp,
    NavigationStackScreenComponent 
} from "react-navigation-stack";
import { SpotifyContext, PlayerContext } from '../providers';

// tslint:disable-next-line: interface-name
interface Props {
    navigation: NavigationStackProp<{name: string}>
}

const PlaylistScreen: NavigationStackScreenComponent<Props> = props => {
    const {spotify, refreshTokens} = useContext(SpotifyContext);
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
            <Button title="Refresh Tokens" onPress={refreshTokens} />

            {!spotify.getAccessToken() && <SpotifyButton />}
        </>
    )
}

const SpotifyButton = props => {
    const {getAuthorizationCode} = useContext(SpotifyContext);
    return(
        <Button title="Login to Spotify" onPress={getAuthorizationCode}></Button>
    )
}


PlaylistScreen.navigationOptions = {
    title: "Playlist Screen"
}

export default PlaylistScreen;
