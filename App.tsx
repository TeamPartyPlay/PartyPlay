import React from 'react';
import MainNavigator from "./components/navigation";
import {  PlayerProvider, PlaylistProvider, SpotifyProvider } from "./components/providers/Spotify";
import { DeviceProvider } from './components/providers/Spotify/Device';

const App = props => (
    <SpotifyProvider >
        <DeviceProvider>
            <PlayerProvider>
                <PlaylistProvider>
                    <MainNavigator style={{backgroundColor: "black"}}/>
                </PlaylistProvider>
            </PlayerProvider> 
        </DeviceProvider>
    </SpotifyProvider>  
);

export default App;