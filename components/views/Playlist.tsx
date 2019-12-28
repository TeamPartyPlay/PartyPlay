import React, { useContext, useState, useEffect } from 'react';
import { Button } from "react-native";
import { 
    NavigationStackProp,
    NavigationStackScreenComponent 
} from "react-navigation-stack";
import { SpotifyContext } from '../providers';
import SpotifyWebApi from 'spotify-web-api-js';




// tslint:disable-next-line: interface-name
interface Props {
    navigation: NavigationStackProp<{name: string}>
}

const PlaylistScreen: NavigationStackScreenComponent<Props> = props => {
    const {spotify} = useContext(SpotifyContext);
    const {navigate} = props.navigation;

    return(
        <>
            <Button title="Play" onPress={()=> {
                    spotify.play().then((value) => console.log(value)).catch(err => console.log(err));
                }
            } />
            <Button title="Pause" onPress={()=>spotify.pause()} />
            <Button title="Skip Song" onPress={()=>spotify.skipToNext()} />
            <Button title="Previous Song" onPress={()=>spotify.skipToPrevious()} />

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
