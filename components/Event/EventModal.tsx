import React, { FC, useState, useEffect, useContext } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, Image, StyleSheet, Button } from "react-native"; 
import { TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';
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

const EventModal: FC<EventListItemProps> = ({openState, event: {_id, name, location, description, attendees}, image, user}) => {

    const [open, setOpen] = openState;
    const [lat, setLat] = useState(44.47816);
    const [lng, setLng] = useState(-73.21265);
    
    const toggle = () => {
      setOpen(!open);
    }
    const [isAttending, setIsAttending] = useState(false);

    useEffect(() => {
        if(user) {
            setIsAttending(attendees.includes(user._id));
        }
        
    }, [user])

    useEffect(() => {
        if(typeof location === "string") {
            setLat(10);
            setLng(-10);
        } else if(location){
            setLat(location.lat);
            setLng(location.lat);
        }
    }, [location])

    return(
        <Modal visible={open} width={1.0}
        footer={
          <ModalFooter>
            <ModalButton
              text="CANCEL"
              onPress={toggle}
            />
          </ModalFooter>
        }>
          <ModalContent style={{backgroundColor: '#33333D', height: 750}}>
            <View style={{height: 600}}>
              <View style={[styles.mapContainer, styles.materialMapView]}>
                <MapView 
                  style={styles.mapView1}
                  provider="google"
                  initialRegion={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.0222,
                    longitudeDelta: 0.0421,
                }}></MapView>
              </View>
              <View style={styles.eventCardContainer}>
                <View style={styles.eventCardBodyContent}>
                  <Text style={styles.eventCardTitleStyle}>{name}</Text>
                </View>
                <ScrollView style={styles.eventCardBody2}>
                  <Text style={styles.eventCardBodyText}>
                    {description}
                  </Text>
                </ScrollView>
                <View style={styles.eventCardActionBody}>
                  <TouchableOpacity style={styles.eventCardActionButton1} onPress={toggle}>
                    <Text style={styles.eventCardActionText1}>GOING</Text>
                  </TouchableOpacity>
                  <EventStatus 
                  eventId={_id} 
                  initialStatus={isAttending}/>
                </View>
              </View>
            </View>   
          </ModalContent>
          {/* <ModalButton style={styles.modalButton} text='CLOSE' onPress = {toggle} /> */}
        </Modal>
    )
}

const styles = StyleSheet.create({
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
        height: '45%',
        width: '100%',
      },
      eventCardBodyContent: {
        justifyContent: "center",
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
        height: '25%'
      },
      contentModal:{
        backgroundColor: "#33333D"
      },
      modalButton: {
        borderWidth: 0,
        backgroundColor: "#33333D"
      }
    // container: {
    //     flexDirection: "row",
    //     marginTop: 5,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginLeft: 15,  
    //     marginRight: 15,
    // },
    
    // containerModal: {
    //     flexDirection: "row",
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // mapContainer:{
    //     width: '100%',
    //     minHeight: 210
    // },
    // title: {
    //     color: "white",
    //     fontSize: 18,
    // },
    // location: {
    //     color: "#ADADB1",
    //     fontSize: 18,
    // },
    // subcontainer:{
    //     flex: 5,
    //     flexDirection:"column",
    //     justifyContent:"space-evenly",
    //     marginRight: 15,
    // },
    // dateContainer: {
    //     flexDirection:"column",
    //     justifyContent:"space-evenly",
    // },
    // partyImage:{
    //     width: 100,
    //     height: 100,
    //     borderRadius: 50,
    //     marginRight: 5,
    // },
    // partyImageModal:{
    //     width: 100,
    //     height: 100,
    //     borderRadius: 50,
    // },
    
    // containerContent: {
    //     flexWrap: "nowrap",
    //     elevation: 3,
    //     shadowOffset: {
    //       height: 2,
    //       width: -2
    //     },
    //     shadowColor: "#000",
    //     shadowOpacity: 0.1,
    //     shadowRadius: 1.5,
    //     overflow: "visible"
    //   },
    //   cardItem1Style: {
    //     height: 120,
    //     flexDirection: "row",
    //     alignItems: "center",
    //     padding: 16
    //   },
    //   headerStyle: {
    //     flex: 1,
    //     flexDirection: "row",
    //     alignItems: "center",
    //   },
    //   leftImage: {
    //     width: 100,
    //     height: 100,
    //     borderRadius: 20
    //   },
    //   headerContent: {
    //     justifyContent: "center",
    //     paddingLeft: 16
    //   },
    //   textStyle: {
    //     color: "#FFF",
    //     fontSize: 16,
    //     lineHeight: 20
    //   },
    //   noteTextStyle: {
    //     color: "#FFF",
    //     opacity: 0.5,
    //     fontSize: 14,
    //     lineHeight: 16
    //   },
    //   cardItemImagePlace: {
    //     flex: 1,
    //     backgroundColor: "#FFF",
    //     minHeight: 210
    //   },
    //   body: {
    //     padding: 16
    //   },
    //   bodyText: {
    //     color: "#424242",
    //     fontSize: 14,
    //     lineHeight: 20
    //   },
    //   actionBody: {
    //     flexDirection: "row",
    //     padding: 8
    //   },
    //   actionButton1: {
    //     height: 36,
    //     width: '100%',
    //     padding: 8
    //   },
    //   actionText1: {
    //     color: "#29b473",
    //     opacity: 0.9,
    //     fontSize: 14
    //   },
    //   modalButton: {
    //       // color: "#FFF",
    //       backgroundColor: "#33333D",
    //   }
})

export default EventModal;