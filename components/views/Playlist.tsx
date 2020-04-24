import React, { useContext, useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, AsyncStorage, ScrollView, Image, FlatList } from "react-native";
import { 
    NavigationStackProp,
    NavigationStackScreenComponent 
} from "react-navigation-stack";
import { SpotifyContext } from '../providers/Spotify';
import { MusicControl } from '../providers/Spotify/Player';
import { Playlist, CreatePlaylistModal } from '../Playlist/Playlist';
import ActionBarImage from '../navigation/ActionBarImage';
import { IEvent } from '../models/Event';
import {baseServerUrl} from '../../secret';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Theme from '../providers/Theme';


// tslint:disable-next-line: interface-name
interface Props {
    navigation: NavigationStackProp<{name: string}>
}

const PlaylistScreen: NavigationStackScreenComponent<Props> = props => {
    const {spotify} = useContext(SpotifyContext);
    const {navigate} = props.navigation;
    const [visible, setVisible]= useState<boolean>(false);
    const [event, setEvent] = useState<IEvent>(undefined);
    const [playlist, setPlaylist] = useState<SpotifyApi.SinglePlaylistResponse>(undefined);
    const [owner, setOwner] = useState();

    const getEvent = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const eventToken = await AsyncStorage.getItem('eventToken');
      const url = `${baseServerUrl}/api/event?token=${token}&eventToken=${eventToken}`
      if(token && eventToken){
        const res = await fetch(url, {
          method:'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        })
        if(res.status === 200){
          const json = await res.json();
          setEvent(json);
        }
      }
    }

    const getOwner = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const eventToken = await AsyncStorage.getItem('eventToken');
      const url = `${baseServerUrl}/api/user/${event.owner}`
      if(token && eventToken){
        const res = await fetch(url, {
          method:'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        })
        if(res.status === 200){
          const json = await res.json();
          setOwner(json);
        }
      }
    }


    useEffect(() => {
      if(spotify.getAccessToken() && event && event?.playlist !== null){
        spotify.getPlaylist(event.playlist.spotifyId, {}, (err, res) => {
          setPlaylist(res);
        })
      }
    }, [spotify, event]);

    useEffect(() => {
      if(event) {
        getOwner();
      }
    }, [event])

    useEffect(() => {
      // Get Event
      getEvent();
    }, [])
    return(
        <>
            <View style={styles.container}>
                <View style={styles.group}>
                    <View style={styles.rect}>
                        {event && <Text style={styles.partyName}>{event.name}</Text>}
                        {owner && <Text style={styles.hosts}>{owner.name}</Text>}
                    </View>
                </View>
            </View>
            <MusicControl />
            <ScrollView style={styles.containerCardCard}>
              {playlist?.tracks?.items !== undefined &&
               <FlatList
                  data={playlist.tracks.items}
                  renderItem={({item}) => <SpotifyItem item={item} />}
                  keyExtractor={item => item.track.id}
                />
              }
            </ScrollView>
            {!spotify.getAccessToken() && <SpotifyButton />}
            
            {/* <Button title ="Create Playlist" onPress={()=> {setVisible(!visible)}} /> */}
            <CreatePlaylistModal visible={visible} setVisible={setVisible}/>
        </>
    )
}

PlaylistScreen.navigationOptions = ({navigation, screenProps}) => ({
  headerTitle: <ActionBarImage/>,
  headerRight: () => {
    return (<TouchableOpacity style={styles.actionButton1} onPress={() => navigation.navigate('CreatePlaylist')}>
          <Ionicons name={`md-add`} style={styles.actionText1}/>
      </TouchableOpacity>
  )},
  headerStyle:{
      backgroundColor: Theme.colors.primary,
      height: 75,
  }
})

const SpotifyItem: React.FC<{item: SpotifyApi.PlaylistTrackObject}> = ({item}) => {
  const {album, artists, name} = item.track;
  return(
    <View style={styles.containerCard}>
      <View style={styles.cardBodyCard}>
          <Image
            source={{uri: album.images[0].url}}
            style={styles.cardItemImagePlaceCard}
          />
        <View style={styles.bodyContentCard}>
          <Text style={styles.titleStyleCard}>{name}</Text>
          <Text style={styles.subtitleStyleCard}>{artists[0].name}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  actionButton1: {
    height: 36,
    width: '100%',
    // tslint:disable-next-line: object-literal-sort-keys
    padding: 8,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  actionText1: {
    color: "#29b473",
    opacity: 0.9,
    fontSize: 35
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


const SpotifyButton = props => {
    const {getAuthorizationCode} = useContext(SpotifyContext);
    return(
        <Button title="Login to Spotify" onPress={getAuthorizationCode}></Button>
    )
}

export default PlaylistScreen;
