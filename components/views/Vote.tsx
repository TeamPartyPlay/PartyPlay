import React, { useContext, useState } from 'react';
import { Text, View, Modal, Button, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationStackProp, NavigationStackScreenComponent  } from "react-navigation-stack";
import { SpotifyContext } from '../providers/Spotify';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';
import ActionBarImage from '../navigation/ActionBarImage';

// tslint:disable-next-line: interface-name
interface VoteScreenProps {
    navigation: NavigationStackProp<{name: string}>
}

// const styles = 

const VoteScreen: NavigationStackScreenComponent<VoteScreenProps> = props => {
    const [modalDisplay, setDisplay] = useState([]);
    const [voteDisplay, setVoteDisplay] = useState([]);
    const {spotify} = useContext(SpotifyContext);
    const [value, setValue] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [image, setImage] = useState<string>("");
    const updateSearch = (search) => {
        setValue(search);
    }
    const onSubmit = (event) => {
        spotify.search(event.nativeEvent.text, ["track"], {limit: 20}).then(response => logResponse(response.tracks.items))
        setIsVisible(!isVisible)
        setOutput(event.nativeEvent.text)
    }
    const logResponse = (res) => {
        for (let index = 0; index < res.length; index++) {   
            modalDisplay.push({ imageURL: res[index].album.images[1].url, uri: res[index].album.uri, name: res[index].name, artist: res[index].artists[0].name, key: res[index].id })
        }
    }

    const mybuttonclick = async (songID) => {
      const temp = _.filter(modalDisplay, { key: songID })[0]
      const uri = temp.uri
      try {
          const res = await fetch('https://partyplayserver.herokuapp.com/api/playlist/add', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  uri
              })
          })
          if(res.status === 200){
              console.log("SUCCESS")
              // const cookieStr: string = res.headers['map']['set-cookie'];
              // const tokenStr: string = cookieStr.split(';')[0];
              // const token: string = tokenStr.split("=")[1];
              // await AsyncStorage.setItem('userToken', token);
              // navigate('App');
          } else {
              throw Error('Sign Up Failed!')
          }
      } catch (error) {
          console.log(error);
      }
      closeModal()
  }

    // const mybuttonclick = (songID) => {
    //     const temp = _.filter(modalDisplay, { key: songID })[0]
    //     const tempKey = "temp" + temp.key
    //     //will be replaced with database insert statement
    //     voteDisplay.push(({ imageURL: temp.imageURL, uri: temp.uri, name: temp.name, artist: temp.artist, key: tempKey }))
    //     closeModal()
    // }

    const closeModal = () => {
        setIsVisible(!isVisible)
        console.log(voteDisplay)
        setDisplay([])
    }
    
    return(
        
        <View>
            <FlatList
                keyExtractor ={(item) => item.key}
                data={voteDisplay}
                renderItem={({ item }) => (
                    <View>
                        <Image
                            style={styles.albumCover}
                            source={{uri: item.imageURL}}
                        />
                        <Text>{item.name}</Text>
                        <Text>{item.artist}</Text>
                    </View>
                )} 
            />
            <SearchBar
                round
                placeholder="Search Songs, Artists, and Albums"
                onChangeText={updateSearch}
                value={value}
                onSubmitEditing={onSubmit}
            />
            <View>
            <Modal
                animationType = {"fade"}  
                transparent = {false}  
                visible = {isVisible}  
                onRequestClose = {() =>{} }>
                
                <FlatList
                    keyExtractor ={(item) => item.key}
                    data={modalDisplay}
                    renderItem={({ item }) => (
                        <View style={styles.containerCardCard}>
                            <View style={styles.containerCard}>
                                <View style={styles.cardBodyCard}>
                                    <Image
                                        source={{uri: item.imageURL}}
                                        style={styles.cardItemImagePlaceCard}
                                    ></Image>
                                    
                                    <View style={styles.bodyContentCard}>
                                        <Text style={styles.titleStyleCard}>{item.name}</Text>
                                        <Text style={styles.subtitleStyleCard}>{item.artist}</Text>
                                        
                                    </View>
                                </View>
                                <Ionicons
                                style={styles.addButton}
                                name="md-add-circle" 
                                size={50} 
                                color="#ADADB1" 
                                onPress={() => {mybuttonclick(item.key)}}
                            />
                            </View>
                        </View>
                    )}
                    
                />
                <View style={{paddingBottom: 36, backgroundColor: '#33333D'}}>
                    <TouchableOpacity style={[styles.containerLogin, styles.materialButtonDark]} onPress={closeModal}>
                        <Text style={styles.captionClose}>Close</Text>
                    </TouchableOpacity>
                </View>  
            </Modal>
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
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    captionClose: {
      color: "#fff",
      fontSize: 14,
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
      actionBodyCard: {
        width: 359,
        height: 52,
        flexDirection: "row"
      },
      actionButton1Card: {
        height: 36,
        padding: 8
      },
      actionText1Card: {
        color: "#000",
        opacity: 0.9,
        fontSize: 14
      },
      actionButton2Card: {
        height: 36,
        padding: 8
      },
      actionText2Card: {
        color: "#000",
        opacity: 0.9,
        fontSize: 14
      },
    albumCover: {
        width: 70,
        height: 70,
        marginTop: 3,
        marginBottom: 3,
    },
    addButton: {
        alignItems: "center",
    },
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#33333D',
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
    },
    subcontainer:{
        flex: 1,
        flexDirection:"column",
        justifyContent:"space-evenly",
        paddingRight: 15,
    },
    songTitle: {
        fontSize: 15,
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'justify',
    },
    artistName: {
        fontSize: 14,
        marginLeft: 10,
        color: '#ADADB1',
        textAlign: 'justify',
    },
})

VoteScreen.navigationOptions = {
    headerTitle: <ActionBarImage />,
    headerStyle:{
        height: 75,
        backgroundColor: '#33333D'
    }
  }

export default VoteScreen;