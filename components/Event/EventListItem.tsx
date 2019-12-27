import React from 'react';
import { View, Text, Image, StyleSheet, Button } from "react-native"; 
import { withNavigation } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';


// tslint:disable-next-line: interface-name
interface EventListItemProps {
    navigation: NavigationStackProp<{name: string}>
    title: string,
    location: string,
    date: Date,
    image: string
}

const EventListItem: React.FC<EventListItemProps> = (props: EventListItemProps) => {
    const {navigation, title, location, date, image} = props;
    // console.log(image);
    return(
        <View style={styles.container}>
            <Image
                style={{ width: 125, height: 125}}
                source={{uri: image}}
                resizeMode="contain"
            />
            <View style={styles.subcontainer}>
                <Text style={{fontSize: 18}}>{`${title}'s Birthday Party`}</Text>
                <Text>{`${location}`}</Text>
                <Text>{date.toLocaleTimeString()}</Text>
                <Text>Friends</Text>
                <View style={{flexDirection: "row", justifyContent:"space-around", alignItems: "stretch"}}>
                    <Button title="Interested" onPress={()=>{navigation.navigate("Event")}} />
                    <Button title="Going" onPress={()=>{}} />
                </View>
            </View>
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 5,
        // borderBottomColor: "black",
        // borderBottomWidth:3,
    },
    subcontainer:{
        flex: 5,
        flexDirection:"column",
        justifyContent:"space-evenly",
    },
})

export default withNavigation(EventListItem);