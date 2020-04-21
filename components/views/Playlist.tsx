import React, { useContext, useState } from 'react';
import { Button, View, Text, StyleSheet, Image } from "react-native";
import { 
    NavigationStackProp,
    NavigationStackScreenComponent 
} from "react-navigation-stack";
import { SpotifyContext } from '../providers/Spotify';
import { MusicControl } from '../providers/Spotify/Player';
import { Playlist, CreatePlaylistModal } from '../Playlist/Playlist';
import ActionBarImage from '../navigation/ActionBarImage';
import { ScrollView } from 'react-native-gesture-handler';


// tslint:disable-next-line: interface-name
interface Props {
    navigation: NavigationStackProp<{name: string}>
}

const PlaylistScreen: NavigationStackScreenComponent<Props> = props => {
    const {spotify} = useContext(SpotifyContext);
    const {navigate} = props.navigation;
    const [visible, setVisible]= useState<boolean>(false);
    return(
        <>
            <View style={styles.container}>
                <View style={styles.group}>
                    <View style={styles.rect}>
                        <Text style={styles.partyName}>Senior Party</Text>
                        <Text style={styles.hosts}>Austin & Kevin</Text>
                    </View>
                </View>
            </View>
            <MusicControl />
            <ScrollView style={styles.containerCardCard}>
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
              </View><View style={styles.containerCard}>
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
              </View><View style={styles.containerCard}>
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
              </View><View style={styles.containerCard}>
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
              </View><View style={styles.containerCard}>
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
            </ScrollView>
            {!spotify.getAccessToken() && <SpotifyButton />}
            <Playlist />
            
            {/* <Button title ="Create Playlist" onPress={()=> {setVisible(!visible)}} /> */}
            <CreatePlaylistModal visible={visible} setVisible={setVisible}/>
            
            {/*
            
            */}
        </>
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
containerCardCard: {
    width: '100%',
  },
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
  bodyContentAddCard: {
    flex: 1,
    paddingTop: '50%'
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
  cardItemImagePlaceCard: {
    width: 120,
    height: 120,
    backgroundColor: "#ccc",
    margin: 10
  },
    container: {
      width: '100%',
      height: 200
    },
    group: {
      width: '100%',
      height: 200,
    },
    rect: {
      width: '100%',
      height: 200,
      backgroundColor: "#2d2d36",
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    partyName: {
      color: "#FFF",
      fontSize: 25,
      textAlign: 'center'
    },
    hosts: {
      color: "#ADADB1",
      fontSize: 20,
      textAlign: 'center'
    }
  });

PlaylistScreen.navigationOptions = {
    headerTitle: <ActionBarImage />,
    headerStyle:{
        height: 75,
        backgroundColor: '#33333D'
    }
  }
const SpotifyButton = props => {
    const {getAuthorizationCode} = useContext(SpotifyContext);
    return(
        <Button title="Login to Spotify" onPress={getAuthorizationCode}></Button>
    )
}

export default PlaylistScreen;
