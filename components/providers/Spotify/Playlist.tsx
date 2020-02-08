import React, { createContext, useContext } from "react";
import { View } from "react-native";
import { SpotifyContext } from "./Spotify";
import SpotifyWebApi from "spotify-web-api-js";

interface PlaylistContextProps {
    create: (options?: CreatePlaylistOptions) => Promise<void>,
    getPlaylist: () => Promise<void>,
    
}

interface CreatePlaylistOptions {
    name: string,
    public: boolean,
    collaborative: boolean,
    description: string
}

const PlaylistContext = createContext<PlaylistContextProps>(null);

const PlaylistProvider: React.FC<{children: React.ReactChildren}> = ({children}) => {
    const {spotify} = useContext(SpotifyContext);

    const create = async (options : CreatePlaylistOptions) => {
        const me = await spotify.getMe();
        spotify.createPlaylist(me.id, options, (err, res) => console.log(res))
    }

    return(
        <PlaylistContext.Provider value={{create, getPlaylist: async () => {}}}>
            {children}
        </PlaylistContext.Provider>
    )
}