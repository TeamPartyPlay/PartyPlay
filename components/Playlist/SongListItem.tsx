import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableHighlight } from 'react-native-gesture-handler';
import { NavigationStackProp } from 'react-navigation-stack';

import { ITrack } from '../models/Event';

// tslint:disable-next-line: interface-name
interface SongListItemProps {
    navigation?: NavigationStackProp<{name: string}>;
    track: ITrack;
}

const SongListItem: React.FC<SongListItemProps> = ({navigation, track}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [currentDate, setDate] = useState<Date>(new Date());
    const {uri, votes} = track;
    const [trackId, setTrackId] = useState<String>('');

    setTrackId(uri.split('spotify:track:')[1]);
    console.log(trackId);

    const toggle = () => setIsVisible(!isVisible);
    return(
        <View style={styles.containerCard}>
            <View style={styles.cardBodyCard}>
                <Image
                    source={require("../../assets/image-asset.png")}
                    style={styles.cardItemImagePlaceCard}
                ></Image>
                <View style={styles.bodyContentCard}>
                    <Text style={styles.titleStyleCard}>Song Name</Text>
                    <Text style={styles.subtitleStyleCard}>Artist</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerCard: {
      backgroundColor: "#33333D",
    },
    cardBodyCard: {
      width: '100%',
      height: 140,
      flexDirection: "row",
    },
    bodyContentCard: {
      flex: 1,
      paddingLeft: 5,
      paddingTop: 20
    },
    cardItemImagePlaceCard: {
      width: 120,
      height: 120,
      backgroundColor: "#ccc",
      margin: 10
    },
    titleStyleCard: {
      color: "#FFF",
      paddingBottom: 12,
      fontSize: 24,
    },
    subtitleStyleCard: {
      color: "#FFF",
      alignSelf: "flex-start",
      opacity: 0.5,
      justifyContent: "space-between",
      paddingTop: 0,
      fontSize: 14,
      lineHeight: 16
    },
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

export default SongListItem;
