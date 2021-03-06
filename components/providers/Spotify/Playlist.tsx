
import React, { createContext, ReactNode, useContext, useState, PropsWithChildren } from "react";
import { AsyncStorage } from "react-native";
import { SpotifyContext } from "./Spotify";


// tslint:disable-next-line: interface-name
interface PlaylistContextProps {
    clearPlaylist: () => Promise<void>,
    createPlaylist: (options?: CreatePlaylistOptions) => Promise<SpotifyApi.CreatePlaylistResponse>,
    currentPlaylist: SpotifyApi.PlaylistObjectFull,
    addSong: (songURI: string) => Promise<void>,

}

// tslint:disable-next-line: interface-name
interface CreatePlaylistOptions {
    name: string,
    public?: boolean,
    collaborative?: boolean,
    description: string
}

const PlaylistContext = createContext<PlaylistContextProps>(null);

const PlaylistProvider: React.FC<PropsWithChildren<{}>> = ({children}) => {
    const {spotify} = useContext(SpotifyContext);
    const [currentPlaylist, setCurrentPlaylist] = useState<SpotifyApi.PlaylistObjectFull>(null);

    const createPlaylist = async (options: CreatePlaylistOptions) : Promise<SpotifyApi.CreatePlaylistResponse> => {
        if(spotify.getAccessToken()){
            try {
                const me = await spotify.getMe();
                const playlist = await spotify.createPlaylist(me.id, options);
                console.log(playlist)
                AsyncStorage.setItem("currentPlaylist", playlist.id);
                setCurrentPlaylist(playlist);
                return playlist;
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    } 

    const addSong = async (songURI: string) => {
        if(spotify.getAccessToken()){
            try {
                const res = await spotify.addTracksToPlaylist(currentPlaylist.id, [songURI]);
            } catch (error) {
                console.error(error);
            }
        }
    }

    const clearPlaylist = async () => {
        setCurrentPlaylist(null);
        AsyncStorage.removeItem("currentPlaylist");
    }

    return(
        <PlaylistContext.Provider value={{createPlaylist, currentPlaylist, addSong, clearPlaylist}}>
            {children}
        </PlaylistContext.Provider>
    )
}

export{ PlaylistContext, PlaylistProvider };