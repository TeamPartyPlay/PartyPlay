import React from 'react';
import { Platform } from 'react-native';
import MainNavigator from "./components/navigation";
import {  PlayerProvider, PlaylistProvider, SpotifyProvider } from "./components/providers/Spotify";
import { DeviceProvider } from './components/providers/Spotify/Device';
import { ThemeProvider } from 'react-native-elements';
import theme from './components/providers/Theme';

import { SafeAreaView } from 'react-navigation';
import { UserProvider } from './components/providers/User';
import { EventProvider } from './components/providers/Event';


const App = props => {
    if (Platform.OS === 'android') {
        SafeAreaView.setStatusBarHeight(0);
    }
    return(
    <ThemeProvider theme={theme}>
        <UserProvider>
            <EventProvider>
                <SpotifyProvider >
                    <DeviceProvider>
                        <PlayerProvider>
                            <PlaylistProvider>
                                <MainNavigator/>
                            </PlaylistProvider>
                        </PlayerProvider> 
                    </DeviceProvider>
                </SpotifyProvider>
            </EventProvider>
        </UserProvider>
    </ThemeProvider>
)};

export default App;