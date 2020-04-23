import React, { FC, useState, useEffect, useContext } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, Image, StyleSheet } from "react-native"; 
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Modal, { ModalContent, ModalTitle, ModalButton } from 'react-native-modals';
import { IEvent } from '../models/Event';
import EventStatus from './EventStatus';
import {baseServerUrl} from '../../secret';
import { UserContext } from '../providers/User';


interface EventListItemProps {
    openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    event: IEvent
    image: string
}

const EventModal: FC<EventListItemProps> = ({openState, event, image}) => {
    const [userToken] = useContext(UserContext);
    const [user, setUser] = useState(undefined);
    const {name, location, description} = event;
    const [open, setOpen] = openState;
    const [lat, setLat] = useState(44.47816);
    const [lng, setLng] = useState(-73.21265);
    const toggle = () => setOpen(!open);

    const getUser = async () => {
        const res = await fetch(`${baseServerUrl}/api/user?token=${userToken}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })

        if(res.status === 200){
            const json = await res.json();
            setUser(json);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    useEffect(() => {
        if(typeof location === "string") {
            setLat(44.47816);
            setLng(-73.21265);
        } else if(location){
            setLat(location.lat);
            setLng(location.lng);
        }
    }, [location])

    return(
        <Modal
                visible={open}
                width={0.9}
                modalTitle={
                <ModalTitle 
                align="left"
                style={{backgroundColor: "#2d2d36", borderBottomColor: "#2d2d36",}}
                textStyle={{color: "#FFF", }}
                title= {name}/>}
            >
                <ModalContent
                style={styles.contentModal}>
                    <View style={[styles.containerContent]}>
                        <View style={styles.cardItem1Style}>
                            <View style={styles.headerStyle}>
                                <Image
                                    source={{uri: image}}
                                    style={styles.leftImage}
                                    resizeMode="contain"
                                ></Image>
                                <View style={styles.headerContent}>
                                    <Text style={styles.textStyle}>{name}</Text>
                                    <Text style={styles.noteTextStyle}>{String(location)}</Text>                                    
                                    <TouchableWithoutFeedback>
                                        {/*<TouchableOpacity 
                                            style={styles.actionButton1} 
                                            // onPress={() => {findCoordinates()}}
                                        >
                                            <Text style={styles.actionText1}>GOING</Text>
                                        </TouchableOpacity>*/}
                                        {user && <EventStatus 
                                            eventId={event._id} 
                                            initialStatus={event.attendees.includes(user._id)} 
                                        />}
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
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
                                coordinate = {{
                                    latitude: 44.47816,
                                    longitude: -73.21265
                                }}
                                pinColor = {"purple"} // any color
                                title={"Red Square Mardi Gras"}
                            />
                        </MapView>
                        <View style={styles.body}>
                        <Text style={styles.noteTextStyle}>{description}</Text>
                        </View>
                        <View style={styles.actionBody}>
                            <TouchableOpacity 
                                style={styles.actionButton1}
                            >
                            <Text style={styles.actionText1}>GOING</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ModalContent>
                <ModalButton style={styles.modalButton} text='close' onPress = {toggle} />
            </Modal>
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
    },
    containerModal: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapContainer:{
        width: '100%',
        minHeight: 210
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
    partyImageModal:{
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    contentModal:{
        backgroundColor: "#33333D",
        width: '100%',
    },
    containerContent: {
        flexWrap: "nowrap",
        elevation: 3,
        shadowOffset: {
          height: 2,
          width: -2
        },
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        overflow: "visible"
      },
      cardItem1Style: {
        height: 120,
        flexDirection: "row",
        alignItems: "center",
        padding: 16
      },
      headerStyle: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      },
      leftImage: {
        width: 100,
        height: 100,
        borderRadius: 20
      },
      headerContent: {
        justifyContent: "center",
        paddingLeft: 16
      },
      textStyle: {
        color: "#FFF",
        fontSize: 16,
        lineHeight: 20
      },
      noteTextStyle: {
        color: "#FFF",
        opacity: 0.5,
        fontSize: 14,
        lineHeight: 16
      },
      cardItemImagePlace: {
        flex: 1,
        backgroundColor: "#FFF",
        minHeight: 210
      },
      body: {
        padding: 16
      },
      bodyText: {
        color: "#424242",
        fontSize: 14,
        lineHeight: 20
      },
      actionBody: {
        flexDirection: "row",
        padding: 8
      },
      actionButton1: {
        height: 36,
        width: '100%',
        padding: 8
      },
      actionText1: {
        color: "#29b473",
        opacity: 0.9,
        fontSize: 14
      },
      modalButton: {
          // color: "#FFF",
          backgroundColor: "#33333D",
      }
})

export default EventModal;