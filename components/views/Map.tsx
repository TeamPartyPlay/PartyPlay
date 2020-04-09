import React, { useState } from 'react';
import { Text, View, ActivityIndicator, Image, StyleSheet, Alert } from "react-native";
import { 
    NavigationStackProp,
    NavigationStackScreenComponent 
} from "react-navigation-stack"
import MapView, { Marker } from 'react-native-maps';


// tslint:disable-next-line: interface-name
interface Props {
    navigation: NavigationStackProp<{name: string}>
}

const MapScreen: NavigationStackScreenComponent<Props> = props => {
    const {navigate} = props.navigation;
    const [userLong, setUserLong] = useState<number>(null)
    const [userLat, setUserLat] = useState<number>(null)
    navigator.geolocation.getCurrentPosition(
        position => {
            setUserLong(parseFloat(JSON.stringify(position.coords.longitude)));
            setUserLat(parseFloat(JSON.stringify(position.coords.latitude)));
        },
        error => Alert.alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
    console.log(userLat)
    console.log(userLong)
    return(
        <MapView
            style = {styles.mapContainer}
            provider="google"
            initialRegion={{
                latitude: userLat,
                longitude: userLong,
                latitudeDelta: 0.0222,
                longitudeDelta: 0.0421,
            }}>
            <Marker 
                coordinate = {{latitude: 44.476577,longitude: -73.212398}}
                pinColor = {"purple"} // any color
                title={"Red Square Mardi Gras"}
                description={"We may not be in New Orleans but we know how to celebrate Mardi Gras like we are located on Bourbon Street. Come join us for our biggest event of the year. Come for live music, giveaways and fun!"}
            />
        </MapView>
    )
}
const styles = StyleSheet.create({
    mapContainer:{
        width: '100%',
        height: '100%'
    },
})
MapScreen.navigationOptions = {
    title: "Map Screen"
}

export default MapScreen;
