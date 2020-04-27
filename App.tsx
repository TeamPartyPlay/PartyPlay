import React from 'react';
import { Platform } from 'react-native';
import MainNavigator from "./components/navigation";
import {  PlayerProvider, PlaylistProvider, SpotifyProvider } from "./components/providers/Spotify";
import { DeviceProvider } from './components/providers/Spotify/Device';
import { ThemeProvider } from 'react-native-elements';
import theme from './components/providers/Theme';

import { SafeAreaView } from 'react-navigation';
import { SocketProvider } from './components/providers/Socket';


const App = props => {
    if (Platform.OS === 'android') {
        SafeAreaView.setStatusBarHeight(0);
    }
    return(
    <ThemeProvider theme={theme}>
        <SocketProvider>
            <SpotifyProvider >
                <DeviceProvider>
                    <PlayerProvider>
                        <PlaylistProvider>
                            <MainNavigator/>
                        </PlaylistProvider>
                    </PlayerProvider> 
                </DeviceProvider>
            </SpotifyProvider>
        </SocketProvider>
    </ThemeProvider>
)};

export default App;