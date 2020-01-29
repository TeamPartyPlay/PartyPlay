import React from 'react';
import MainNavigator from "./components/navigation";
import { SpotifyProvider, PlayerProvider } from "./components/providers/Spotify";
import { DeviceProvider } from './components/providers/Spotify/Device';

const App = props => (
    <SpotifyProvider >
        <DeviceProvider>
            <PlayerProvider>
                <MainNavigator />
            </PlayerProvider> 
        </DeviceProvider>
    </SpotifyProvider>  
);

export default App;