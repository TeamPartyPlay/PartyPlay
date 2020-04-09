import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { SpotifyContext } from "./Spotify";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
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
        <View style={{flex: 1, flexDirection: 'column', alignContent: 'stretch'}}>
              {(playbackState && playbackState.item) ?
                <View style={[styles.container]}>
                    <View style={styles.cardBody}>
                        <View style={styles.bodyContent}>
                        <Text style={styles.titleStyle}>{playbackState.item.name}</Text>
                        <Text style={styles.subtitleStyle}>{playbackState.item.artists.map(el => el.name).join(', ')}</Text>
                        </View>
                        <Image
                        source={{uri: playbackState.item.album.images[0].url}}
                        style={styles.cardItemImagePlace}
                        ></Image>
                    </View>
                </View>
                : <></>}
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
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#33333D",
      flexWrap: "nowrap",
      overflow: "hidden"
    },
    cardBody: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    bodyContent: {
      flex: 1,
      padding: 16,
      paddingTop: 24
    },
    titleStyle: {
      color: "white",
      paddingBottom: 12,
      fontSize: 24,
    },
    subtitleStyle: {
      color: "#ADADB1",
      opacity: 0.5,
      fontSize: 14,
      lineHeight: 16
    },
    cardItemImagePlace: {
      borderRadius: 50,
      width: 80,
      height: 80,
      backgroundColor: "#ccc",
      margin: 16
    },
    actionBody: {
      flexDirection: "row",
      padding: 8
    },
    actionButton1: {
      height: 36,
      padding: 8
    },
    actionText1: {
      color: "#000",
      opacity: 0.9,
      fontSize: 14
    },
    actionButton2: {
      height: 36,
      padding: 8
    },
    actionText2: {
      color: "#000",
      opacity: 0.9,
      fontSize: 14
    }
  });
export { PlayerContext, PlayerProvider, MusicControl};
