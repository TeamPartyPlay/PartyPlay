import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { SpotifyContext } from "./Spotify";
import { Image, Text, View } from "react-native";
import SpotifyWebApi from "spotify-web-api-js";
import { Ionicons } from '@expo/vector-icons';
import { DeviceContext } from "./Device";

const IconComponent = Ionicons;


// tslint:disable-next-line: interface-name
interface PlayerContextProps {
    spotify: SpotifyWebApi.SpotifyWebApiJs,
    play: () => Promise<void>,
    pause: () => Promise<void>,
    next: () => Promise<void>,
    previous: () => Promise<void>,
    playbackState: SpotifyApi.CurrentPlaybackResponse
}

// tslint:disable-next-line: interface-name
interface SpotifyProps {
    children?: ReactNode,
}

const PlayerContext = createContext<PlayerContextProps>(null);

const PlayerProvider: FC<SpotifyProps> = ({children}) => {
    const {spotify} = useContext(SpotifyContext);
    const {currentDevice, setCurrentDevice} = useContext(DeviceContext);
    const [playbackState, setPlaybackState] = useState<SpotifyApi.CurrentPlaybackResponse>(null);

    useEffect(()=>{
        if(spotify.getAccessToken()){
            spotify.getMyCurrentPlaybackState()
            .then(currentPlaybackState => {
                setPlaybackState(currentPlaybackState);
            })
            .catch(err => console.error(err))
        }
    }, [spotify.getAccessToken()]);

    const pause = async () => {
        const currentPlaybackState = await spotify.getMyCurrentPlaybackState();
        setCurrentDevice(currentPlaybackState.device.id);
        await spotify.pause();
        setPlaybackState(await spotify.getMyCurrentPlaybackState());
    }

    const play = async () => {
        await spotify.play({
            device_id: playbackState.device.id, 
        })
        setPlaybackState(await spotify.getMyCurrentPlaybackState());
    }
    
    const next = async () => {
        await spotify.skipToNext();
        setPlaybackState(await spotify.getMyCurrentPlaybackState());

    }

    const previous = async () => {
        await spotify.skipToPrevious();
        setPlaybackState(await spotify.getMyCurrentPlaybackState());
    }

    return(
        <PlayerContext.Provider value={{
            spotify, 
            play, 
            pause, 
            next, 
            previous,
            playbackState,
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

const MusicControl: React.FC<SpotifyProps> = ({children}) => {
    const {next, playbackState, previous, pause, play} = useContext(PlayerContext);
    return(
        <View>
              <View>{
                (playbackState && playbackState.item) ?
                <>
                    <Image style={{width: 250, height: 250}} source={{uri: playbackState.item.album.images[0].url}}/>
                    <Text>{playbackState.item.artists.map(el => el.name).join(', ')}</Text>
                    <Text>{playbackState.item.name}</Text>
                </>
                : <></>
              }</View>


            <View style={{flexDirection: "row", justifyContent: 'space-around'}}>
                <IconComponent name="md-skip-backward" size={25} onPress={previous}/>
                {
                    playbackState && playbackState.is_playing 
                    ? <IconComponent name="md-pause" size={25} onPress={pause} />
                    : <IconComponent name="md-play" size={25} onPress={play}/>
                }
                <IconComponent name="md-skip-forward" size={25} onPress={next}/>    
            </View>
        </View>
    )
}

export { PlayerContext, PlayerProvider, MusicControl};
