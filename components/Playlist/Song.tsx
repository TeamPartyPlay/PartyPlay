import React, { useContext, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import SpotifyWebApi from 'spotify-web-api-js';
import { SpotifyContext } from '../providers';

// tslint:disable-next-line: interface-name
interface SongsProps {
    song: SpotifyApi.TrackObjectFull
}

const Song: React.FC<SongsProps> = ({song}) => {

    const {spotify} = useContext(SpotifyContext)

    const createPlaylist = () => {
        if(spotify){
            spotify.getMe({}, (error, me)=>{
                spotify.createPlaylist(me.id, {name: "My New Playlist", public:false, description: "Testing the Spotify Api"}, (err, res) => {
                    console.log(err, res)
                    spotify.getPlaylist(res.id, {}, (playlistError, response) => {
                        console.log(playlistError, response);
                    });
                })
            })
            
        }
    }
    return(
        <View>
            <Text>{song.name}</Text>
            <Button onPress={createPlaylist} title={"Create Playlist"} />
        </View>
    );
}

export default Song;