import React, { createContext, ReactNode, FC, useContext, useEffect, useState } from "react";
import { SpotifyContext } from "./Spotify";
import { AsyncStorage } from "react-native";
import SpotifyWebApi from "spotify-web-api-js";

const PlayerContext = createContext<{
    spotify: SpotifyWebApi.SpotifyWebApiJs,
    play: () => Promise<void>,
    pause: () => Promise<void>
}>(null);

// tslint:disable-next-line: interface-name
interface SpotifyProps {
    children?: ReactNode,
}

const PlayerProvider: FC<SpotifyProps> = ({children}) => {
    const {spotify} = useContext(SpotifyContext);
    const [userId, setUserId] = useState(null);
    const [device, setDevice] = useState(null);
    const [context, setContext] = useState("");
    const [progress, setProgress] = useState(-1);
    const [offset, setOffset] = useState(null);

    useEffect(()=>{
        if(spotify.getAccessToken()){
            AsyncStorage.getItem('currentDevice').then(value => {
                if(value){
                    setDevice(value);
                } else {
                    spotify.getMyDevices().then(res=>{
                        const d = res.devices.find(device => device.is_active);
                        setDevice(d.id);
                        AsyncStorage.setItem('currentDevice', d.id);
                    });
                }
            })
        }
    }, [spotify.getAccessToken()]);

    const pause = async () => {
        const currentPlaybackState = await spotify.getMyCurrentPlaybackState();
        console.log("Pausing Music...", currentPlaybackState.context);
        if (currentPlaybackState.context){
            setContext(currentPlaybackState.context.uri);
            setProgress(currentPlaybackState.progress_ms);   
            setOffset(null);
        } else {
           setContext(currentPlaybackState.item.album.uri);
           setProgress(currentPlaybackState.item.duration_ms);
           // setOffset(currentPlaybackState.item.track_number);
        }
        setDevice(currentPlaybackState.device.id);
        
        spotify.pause();
    }

    const play = async () => {
        spotify.play({context_uri: context, device_id: device, position_ms: progress});
    }
    return(
        <PlayerContext.Provider value={{spotify, play, pause}}>
            {children}
        </PlayerContext.Provider>
    )
}

const MusicControl: React.FC<SpotifyProps> = ({children}) => {
    const player = useContext(PlayerContext);
    const [isPlaying, setIsPlaying] = useState(player.spotify)
    return(
        <>
        </>
    )
}

export { PlayerContext, PlayerProvider };
