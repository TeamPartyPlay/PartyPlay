import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import SpotifyWebApi from 'spotify-web-api-js';
import { SpotifyContext } from '../providers';

interface SongsProps {

}

const Song: React.FC<> = () => {
    const spotify = useContext(SpotifyContext)
    return(
        <View>
            <Text>This is a song</Text>
        </View>
    )
}