import React from 'react';
import MainNavigator from "./components/navigation";
import { SpotifyProvider, PlayerProvider } from "./components/providers/Spotify";

const App = props => (
    <SpotifyProvider >
        <PlayerProvider>
            <MainNavigator />
        </PlayerProvider> 
    </SpotifyProvider>  
);

export default App;