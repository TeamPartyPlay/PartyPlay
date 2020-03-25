import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, Image, StyleSheet, Button, Dimensions} from "react-native"; 
import { withNavigation } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
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
            <Modal
                visible={isVisible}
                width={0.9}
                modalTitle={
                <ModalTitle 
                align="left"
                style={{backgroundColor: "#2d2d36", borderBottomColor: "#2d2d36",}}
                textStyle={{color: "#FFF", }}
                title= {title}/>}
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
                                    <Text style={styles.textStyle}>{`${title}'s Birthday Party`}</Text>
                                    <Text style={styles.noteTextStyle}>{`${location}`}</Text>
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
                                coordinate = {{latitude: 44.476577,longitude: -73.212398}}
                                pinColor = {"purple"} // any color
                                title={"Red Square Mardi Gras"}
                                description={"We may not be in New Orleans but we know how to celebrate Mardi Gras like we are located on Bourbon Street. Come join us for our biggest event of the year. Come for live music, giveaways and fun!"}
                            />
                        </MapView>
                        <View style={styles.body}>
                            <Text style={styles.noteTextStyle}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </Text>
                        </View>
                        <View style={styles.actionBody}>
                            <TouchableOpacity style={styles.actionButton1}>
                            <Text style={styles.actionText1}>GOING</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ModalContent>
                <ModalButton style={styles.modalButton} text='close' onPress = {() => {closeModal()}}></ModalButton>
            </Modal>
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
        padding: 8
      },
      actionText1: {
        color: "#FFF",
        opacity: 0.9,
        fontSize: 14
      },
      modalButton: {
          color: "#FFF",
          backgroundColor: "#33333D",
      }
})

export default withNavigation(EventListItem);