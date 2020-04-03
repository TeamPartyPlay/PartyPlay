import React from 'react';
import MainNavigator from "./components/navigation";
import {  PlayerProvider, PlaylistProvider, SpotifyProvider } from "./components/providers/Spotify";
import { DeviceProvider } from './components/providers/Spotify/Device';
console.disableYellowBox = true;

const App = props => (
    
    <SpotifyProvider >
        <DeviceProvider>
            <PlayerProvider>
                <PlaylistProvider>
                    <MainNavigator/>
                </PlaylistProvider>
            </PlayerProvider> 
        </DeviceProvider>
    </SpotifyProvider>  
);

export default App;