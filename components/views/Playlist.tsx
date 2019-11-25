import React from 'react';
import { ActivityIndicator, View } from "react-native";
import { 
    NavigationStackProp,
    NavigationStackScreenComponent 
} from "react-navigation-stack"


// tslint:disable-next-line: interface-name
interface Props {
    navigation: NavigationStackProp<{name: string}>
}

const PlaylistScreen: NavigationStackScreenComponent<Props> = props => {
    const {navigate} = props.navigation;
    return(
        <View>
            <ActivityIndicator />
        </View>
    )
}

PlaylistScreen.navigationOptions = {
    title: "Playlist Screen"
}

export default PlaylistScreen;
