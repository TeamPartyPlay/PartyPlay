import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableHighlight } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';

import EventModal from './EventModal';

// tslint:disable-next-line: interface-name
interface EventListItemProps {
    navigation: NavigationStackProp<{name: string}>
    title: string,
    location: string,
    date: Date,
    image: string
}

const EventListItem: React.FC<EventListItemProps> = ({navigation, title, location, date, image}: EventListItemProps) => {
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
    const toggle = () => setIsVisible(!isVisible);

    var daysTill = mybuttonclick(date);
    return(
        <View>
            <EventModal openState={[isVisible, setIsVisible]} title={title} location={location} date={date} image={image} />
            <TouchableHighlight onPress = {toggle}>
                <View style={styles.container}>
                        <Image
                                style={styles.partyImage}
                                source={{uri: image}}
                                resizeMode="contain"
                            />
                        <View style={styles.subcontainer}>
                                <Text style={styles.title}>{`${title}'s Birthday Party`}</Text>
                                <Text style={styles.location}>{`${location}`}</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={{color: "white"}}>{daysTill}</Text>
                        </View>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    containerLogin: {
        backgroundColor: "#212121",
        position: 'absolute',
        bottom: 0,
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
    materialButtonDark: {
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
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

export default withNavigation(EventListItem);
