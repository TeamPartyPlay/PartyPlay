import React from 'react';
import { Text, View, ActivityIndicator } from "react-native";
import { 
    NavigationStackProp,
    NavigationStackScreenComponent 
} from "react-navigation-stack"


// tslint:disable-next-line: interface-name
interface Props {
    navigation: NavigationStackProp<{name: string}>
}

const MapScreen: NavigationStackScreenComponent<Props> = props => {
    const {navigate} = props.navigation;
    return(
        <View>
            <ActivityIndicator />
        </View>
    )
}

MapScreen.navigationOptions = {
    title: "Map Screen"
}

export default MapScreen;
