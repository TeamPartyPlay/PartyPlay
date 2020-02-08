import React, { useContext, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import SpotifyWebApi from 'spotify-web-api-js';
import { SpotifyContext } from '../providers';

interface SongsProps {

}

const Song: React.FC<SongsProps> = () => {
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
        <Button onPress={createPlaylist} title={"Create Playlist"} />
    )
}

export default Song;