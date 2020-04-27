import React, { useContext, useState, useEffect, FC } from 'react';
import { 
  Text, 
  View,
  Image, 
  FlatList, 
  StyleSheet,  
  AsyncStorage, 
  NativeSyntheticEvent, 
  TextInputSubmitEditingEventData, 
  RefreshControl
} from "react-native";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationStackProp, NavigationStackScreenComponent  } from "react-navigation-stack";
import { SpotifyContext } from '../providers/Spotify';
import { SearchBar, Button } from 'react-native-elements';
import ActionBarImage from '../navigation/ActionBarImage';
import {baseServerUrl} from '../../secret';
import { IEvent, IPlaylist, ITrack } from '../models/Event';
import VoteModal from '../Vote/VoteModal';
import { Ionicons } from '@expo/vector-icons';
import { SocketContext } from '../providers/Socket';

// tslint:disable-next-line: interface-name
interface VoteScreenProps {
    navigation: NavigationStackProp<{name: string}>
}

const VoteScreen: NavigationStackScreenComponent<VoteScreenProps> = props => {
  const {spotify} = useContext(SpotifyContext);
  const socket = useContext(SocketContext);
  const [value, setValue] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [event, setEvent] = useState<IEvent>();
  const [results, setResults] = useState<SpotifyApi.SearchResponse>();
  const [playlist, setPlaylist] = useState<IPlaylist>();
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState();

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

  const getUser = async () => {
        
    const userToken = await AsyncStorage.getItem("userToken");
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

  const getPlaylist = async () : Promise<IPlaylist> => {
    setRefreshing(true);
    const token = await AsyncStorage.getItem('userToken');
    const eventToken = await AsyncStorage.getItem('eventToken');
    const url = `${baseServerUrl}/api/playlist?token=${token}&eventToken=${eventToken}`
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
        setPlaylist(json);
        setRefreshing(false);
        return json;
      }
    }
    setRefreshing(false);
    return null;
  }

  const removeTrack = async (trackId: string) => {
    const userToken = await AsyncStorage.getItem('userToken');
    const eventToken = await AsyncStorage.getItem('eventToken');
    const res = await fetch('https://partyplayserver.herokuapp.com/api/playlist/remove', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: trackId,
            token: userToken,
            eventToken
          })
      })
    if(res.status === 200){
      const json =  await res.json();
    }
  }

  useEffect(() => {
    console.log("Creating Socket Event")
    socket.on("updatePlaylist", () => {
      console.log("Event Emit")
      getPlaylist().then(res => {
        if(event.owner === user._id){
          const {tracks} = res;
          const tracksToAdd: string[] = [];
          for(const track of tracks) {
            if(track.votes.length === 3) {
              tracksToAdd.push(track.uri.split(':').pop());
              removeTrack(track._id);
            }
          }
          if(tracksToAdd.length){
            spotify
              .addTracksToPlaylist(playlist.spotifyId, tracksToAdd)
              .then(result => console.log(result));
          }
        }
      })
    })
  }, [])

  useEffect(() => {
    getPlaylist();
  }, [isVisible])

  useEffect(() => {
    getEvent();
    getPlaylist();
    getUser();
  }, []);

  useEffect(() => {
    if(results) setIsVisible(true);
  }, [results]);


  const onSearch = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    spotify.search(e.nativeEvent.text, ["track"], {limit: 20})
      .then(response => setResults(response));
  }
    return(

        <View>
            <SearchBar
                round
                placeholder="Search Songs, Artists, and Albums"
                onChangeText={text => setValue(text)}
                value={value}
                onSubmitEditing={onSearch}
            />
            {results && <VoteModal 
              openState={[isVisible, setIsVisible]} 
              resultsState={[results, setResults]}
              searchState={[value, setValue]}
              />}
              
            
              {playlist &&               
              <FlatList
                data={playlist.tracks}
                refreshControl={<RefreshControl 
                  refreshing={refreshing} 
                  onRefresh={getPlaylist}/>}
                renderItem={({item}) => <PlaylistItem track={item}/>}
                keyExtractor={(item) => item._id}
              />}
        </View>
    )
}

const PlaylistItem: FC<{track: ITrack}> = ({track:{_id, uri, votes}}) => {
  const {spotify} = useContext(SpotifyContext);
  const [track, setTrack] = useState<SpotifyApi.SingleTrackResponse>();

  const vote = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const eventToken = await AsyncStorage.getItem('eventToken');
      const res = await fetch('https://partyplayserver.herokuapp.com/api/playlist/vote', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: _id,
            token: userToken,
            eventToken
          })
      })
      if(res.status === 200){
          const json =  await res.json();
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if(uri) {
      const id = uri.split(':').pop();
      spotify.getTrack(id)
      .then(res => setTrack(res))
      .catch(err => console.log(err));
    }
  }, [])
  return(
    <View style={styles.containerCard}>
      {track && 
        <View style={styles.cardBodyCard}>
        <Image
          source={{uri: track.album.images[0].url}}
          style={styles.cardItemImagePlaceCard}
        ></Image>
        <View style={styles.bodyContentCard}>
          <Text style={styles.titleStyleCard}>{track.name}</Text>
          <Text style={styles.subtitleStyleCard}>{track.artists[0].name}</Text>
        </View>
        <View style={{
          flex: 0,
          justifyContent: 'center',
          alignItems: 'center'}}>
          <Ionicons
            name="ios-thumbs-up"
            size={50}
            color="#ADADB1"
            onPress={vote}           
          />
          <Text style={[styles.subtitleStyleCard, {alignSelf: 'center'}]}>{votes.length}</Text>
        </View>

      </View>
      }
      
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
      voteStyleCard: {
        color: "#FFF",
        alignSelf: "flex-end",
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
