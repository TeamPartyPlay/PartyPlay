import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, Image, StyleSheet, Button, Dimensions} from "react-native"; 
import { withNavigation } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Modal, { ModalContent, ModalTitle, BottomModal, ModalButton } from 'react-native-modals';

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
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [currentDate, setDate] = useState<Date>(new Date());
    const mybuttonclick = (date) => {
        var msDiff = currentDate.getTime() - date.getTime();    //Future date - current date
        var daysTillEvent = Math.floor(msDiff / (1000 * 60 * 60 * 24)) * -1;
        if(daysTillEvent == 0){
            return "Today";
        } else {
            return date.toLocaleDateString();
        }
    }

    const onClickView = () => {
        setIsVisible(!isVisible)
    }
    const closeModal = () => {
        setIsVisible(!isVisible)
    }
    var daysTill = mybuttonclick(date);
    // console.log(image);
    return(
        <View>
            <BottomModal
                visible={isVisible}
                width={0.95}
                modalTitle={
                <ModalTitle 
                align="left"
                style={{backgroundColor: "#2d2d36", borderBottomColor: "#2d2d36",}}
                textStyle={{color: "#000", }}
                title= {title}/>}
            >
                <ModalContent
                style={{backgroundColor: "#33333D"}}>
                    <View style={styles.container}>
                        <Image
                            style={styles.partyImage}
                            source={{uri: image}}
                            resizeMode="contain"
                        />
                        <View style={styles.subcontainer}>
                            <Text>{`${title}'s Birthday Party`}</Text>
                            <Text>{`${location}`}</Text>
                            <Text>Friends</Text>
                        </View>
                        <View> 
                            <Text style={{color: "white"}}>{daysTill}</Text>
                            <Button title="Going" onPress={()=>{}} />
                        </View>
                    </View>
                </ModalContent>
                <MapView
                    style = {styles.mapContainer}
                    provider="google"
                    initialRegion={{
                        latitude: 44.47816,
                        longitude: -73.21265,
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
                <ModalButton text='close' onPress = {() => {closeModal()}}></ModalButton>
            </BottomModal>
        <TouchableHighlight onPress = {() => onClickView()}>
            <View style={styles.container}>
                <Image
                    style={styles.partyImage}
                    source={{uri: image}}
                    resizeMode="contain"
                />
                <View style={styles.subcontainer}>
                    <Text style={styles.title}>{`${title}'s Birthday Party`}</Text>
                    <Text style={styles.location}>{`${location}`}</Text>
                    {/* <Text>Friends</Text> */}
                    {/* <View style={{flexDirection: "row", justifyContent:"space-around", alignItems: "stretch"}}>
                        <Button title="Interested" onPress={()=>{navigation.navigate("Event")}} />
                        
                    </View> */}
                </View>
                <View style={styles.dateContainer}> 
                    <Text style={{color: "white"}}>{daysTill}</Text>
                    <Button title="Going" onPress={()=>{}} />
                </View>
            </View>
        </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,  
        marginRight: 15,
        // borderBottomColor: "black",
        // borderBottomWidth:3,
    },
    mapContainer:{
        width: '100%',
        height: '70%',
    },
    title: {
        color: "white",
        fontSize: 18,
    },
    location: {
        color: "#ADADB1",
        fontSize: 18,
    },
    subcontainer:{
        flex: 5,
        flexDirection:"column",
        justifyContent:"space-evenly",
        marginRight: 15,
    },
    dateContainer: {
        flexDirection:"column",
        justifyContent:"space-evenly",
    },
    partyImage:{
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 5,
    },
})

export default withNavigation(EventListItem);