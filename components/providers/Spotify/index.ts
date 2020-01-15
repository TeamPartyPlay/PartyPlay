import { PlayerContext, PlayerProvider } from './Player';
import { SpotifyContext, SpotifyProvider } from "./Spotify";


interface SpotifyProps {
    Provider: React.FC,
    Context: React.Context<any>,
    Player: {
        Provider: React.FC,
        Context: React.Context<any>,
    }
    Device: {
        Provider: React.FC,
        Context: React.Context<any>,
    }
}

const Spotify: SpotifyProps = null;

Spotify.Provider = SpotifyProvider;
Spotify.Context = SpotifyContext;
Spotify.Player = {
    Provider: PlayerProvider,
    Context: PlayerContext,
}


export {
    PlayerContext, 
    PlayerProvider,
    Spotify, 
    SpotifyContext, 
    SpotifyProvider 
};