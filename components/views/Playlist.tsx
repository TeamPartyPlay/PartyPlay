import React, { useContext } from 'react';
import { Button } from "react-native";
import { 
    NavigationStackProp,
    NavigationStackScreenComponent 
} from "react-navigation-stack";
import { SpotifyContext } from '../providers';


// tslint:disable-next-line: interface-name
interface Props {
    navigation: NavigationStackProp<{name: string}>
}

const PlaylistScreen: NavigationStackScreenComponent<Props> = props => {
    const {getAuthorizationCode, accessToken, refreshTokens} = useContext(SpotifyContext);
    const {navigate} = props.navigation;
    return(
        !accessToken && <SpotifyButton />
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
