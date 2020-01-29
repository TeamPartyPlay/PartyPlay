import { PlayerContext, PlayerProvider } from './Player';
import { SpotifyContext, SpotifyProvider } from "./Spotify";
import { DeviceContext, DeviceProvider } from './Device';


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

const Spotify: SpotifyProps = {
    Context: SpotifyContext,
    Provider: SpotifyProvider,
    Player: {
        Context: PlayerContext,
        Provider: PlayerProvider,
    },
    Device:{
        Context: DeviceContext,
        Provider: DeviceProvider,
    }
};


export {
    PlayerContext, 
    PlayerProvider,
    Spotify, 
    SpotifyContext, 
    SpotifyProvider 
};