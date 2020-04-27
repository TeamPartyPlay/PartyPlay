import React, { FC, useState, useEffect, useContext } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, Image, StyleSheet, ScrollView } from "react-native"; 
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Modal, { ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';
import { IEvent } from '../models/Event';
import EventStatus from './EventStatus';
import {baseServerUrl} from '../../secret';


interface EventListItemProps {
    openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    event: IEvent
    image: string,
    user: any,
}

const EventModal: FC<EventListItemProps> = ({openState, event: {_id, name, location, description, attendees, start}, image, user}) => {

    const [open, setOpen] = openState;
    const [lat, setLat] = useState(44.47816);
    const [lng, setLng] = useState(-73.21265);
    const toggle = () => setOpen(!open);
    const [isAttending, setIsAttending] = useState(false);

    useEffect(() => {
        if(user) {
            setIsAttending(attendees.includes(user._id));
        }
        
    }, [user])

    useEffect(() => {
        if(typeof location === "string") {
            setLat(44.47816);
            setLng(-73.21265);
        } else if(location){
            setLat(44.47816);
            setLng(-73.21265);
        }
    }, [location])

    return(
      <Modal visible={open} width={1.0}
      footer={
        <ModalFooter>
          <ModalButton
            style={styles.modalButton}
            color="#29b473"
            text="CANCEL"
            onPress={toggle}
          />
        </ModalFooter>
      }>
        <ModalContent style={{backgroundColor: '#33333D', height: 500}}>
          <View>
            <View style={[styles.mapContainer, styles.materialMapView]}>
              <MapView 
                style={styles.mapView1}
                provider="google"
                initialRegion={{
                  latitude: lat,
                  longitude: lng,
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
            </View>
            <View style={styles.eventCardContainer}>
              <View style={{justifyContent: "space-between", flexDirection: "row",}}>
                <View style={styles.eventCardBodyContent}>
                  <Text style={styles.eventCardTitleStyle}>{name}</Text>
                  <Text style={styles.eventCardSubtitleStyle}>{start}</Text>
                </View>
                <EventStatus 
                eventId={_id} 
                initialStatus={isAttending}/>
              </View>
              <ScrollView style={styles.eventCardBody2}>
                <Text style={styles.eventCardBodyText}>
                  {description}
                </Text>
              </ScrollView>
            </View>
          </View>   
        </ModalContent>
        {/* <ModalButton style={styles.modalButton} text='CLOSE' onPress = {toggle} /> */}
      </Modal>
    )
}

const styles = StyleSheet.create({
  modalButton: {
    backgroundColor: "#33333D",
    color: "#29b473"
  },
  captionClose: {
    color: "#fff",
    fontSize: 14,
  },
  materialButtonDark: {
    width: 271,
    height: 36,
    backgroundColor: "rgba(41,180,115,1)",
    borderRadius: 100,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.3,
    marginTop: 22,
  },
  containerLogin: {
    backgroundColor: "#212121",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 2,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
    eventCardContainer: {
        backgroundColor: "#33333D",
        flexWrap: "nowrap",
        height: '55%',
        width: '100%',
      },
      eventCardBodyContent: {
        flexDirection: 'column',
        padding: 16,
        paddingTop: 24,
      },
      eventCardTitleStyle: {
        color: "#FFF",
        paddingBottom: 12,
        fontSize: 24,
      },
      eventCardSubtitleStyle: {
        color: "#FFF",
        opacity: 0.5,
        fontSize: 14,
        lineHeight: 16
      },
      eventCardBody2: {
        padding: 16,
        paddingTop: 8
      },
      eventCardBodyText: {
        color: "#FFF",
        opacity: 0.5,
        flexWrap: "wrap",
        fontSize: 14,
        lineHeight: 20,
        height: 300
      },
      eventCardActionBody: {
        backgroundColor: '#33333D',
        flexDirection: "row",
        flex: 0,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 8,
      },
      eventCardActionButton1: {
        height: 36,
        padding: 8,
      },
      eventCardActionText1: {
        color: "#FFF",
        opacity: 0.9,
        fontSize: 14
      },
      eventCardActionButton2: {
        padding: 8,
      },
      eventCardActionText2: {
        color: "#FFF",
        opacity: 0.9,
        fontSize: 14
      },
      mapContainer: {
        backgroundColor: '#33333D'
      },
      mapView1: {
        flex: 1,
      },
      partyContainer: {
        backgroundColor: '#33333D',
      },
      materialMapView: {
        width: '100%',
        height: '45%'
      },
      contentModal:{
        backgroundColor: "#33333D"
      },
      modalButton: {
        borderWidth: 0,
        backgroundColor: "#33333D"
      }
})

export default EventModal;