import React from 'react';
import MainNavigator from "./components/navigation";
import { SpotifyProvider } from "./components/providers";

const App = props => (
    <SpotifyProvider >
        <MainNavigator />
    </SpotifyProvider>  
);

export default App;