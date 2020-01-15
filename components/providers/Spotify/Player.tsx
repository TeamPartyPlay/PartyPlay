import React, { createContext, ReactNode, FC, useContext, useEffect, useState } from "react";
import { SpotifyContext } from ".";
import { AsyncStorage, View, Button } from "react-native";
import SpotifyWebApi from "spotify-web-api-js";
import { Ionicons } from '@expo/vector-icons';

const IconComponent = Ionicons;


// tslint:disable-next-line: interface-name
interface PlayerContextProps {
    spotify: SpotifyWebApi.SpotifyWebApiJs,
    play: () => Promise<void>,
    pause: () => Promise<void>,
    next: () => Promise<void>,
    previous: () => Promise<void>,
    devices: () => Promise<SpotifyApi.UserDevicesResponse>,
    isPlaying: boolean,
}

// tslint:disable-next-line: interface-name
interface SpotifyProps {
    children?: ReactNode,
}

const PlayerContext = createContext<PlayerContextProps>(null);

const PlayerProvider: FC<SpotifyProps> = ({children}) => {
    const {spotify} = useContext(SpotifyContext);
    const [userId, setUserId] = useState(null);
    const [device, setDevice] = useState(null);
    // const [context, setContext] = useState("");
    // const [progress, setProgress] = useState(-1);
    // const [offset, setOffset] = useState(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(null);

    useEffect(()=>{
        if(spotify.getAccessToken()){
            spotify.getMyCurrentPlaybackState()
            .then(currentPlaybackState => {
                setIsPlaying(currentPlaybackState.is_playing);
            })
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
        setDevice(currentPlaybackState.device.id);
        
        spotify.pause()
        .then(()=>setIsPlaying(false));
    }

    const play = async () => {
        spotify.play({
            // context_uri: context, 
            device_id: device, 
            // position_ms: progress
        })
        .then(()=>setIsPlaying(true));
    }
    return(
        <PlayerContext.Provider value={{
            spotify, 
            play, 
            pause, 
            devices: spotify.getMyDevices, 
            next: spotify.skipToNext, 
            previous: spotify.skipToPrevious,
            isPlaying
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

const MusicControl: React.FC<SpotifyProps> = ({children}) => {
    const player = useContext(PlayerContext);
    return(
        <View style={{flexDirection: "row", justifyContent: 'space-around'}}>
            <IconComponent name="md-skip-backward" size={25} onPress={player.previous}/>
            {
                player.isPlaying 
                ? <IconComponent name="md-pause" size={25} onPress={player.pause} />
                : <IconComponent name="md-play" size={25} onPress={player.play}/>
            }
            <IconComponent name="md-skip-forward" size={25} onPress={player.next}/>
            
        </View>
    )
}

export { PlayerContext, PlayerProvider, MusicControl};
