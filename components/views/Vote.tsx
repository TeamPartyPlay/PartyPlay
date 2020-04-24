import React, { useContext, useState, useEffect, FC } from 'react';
import { 
  Text, 
  View,
  Image, 
  FlatList, 
  StyleSheet,  
  AsyncStorage, 
  NativeSyntheticEvent, 
  TextInputSubmitEditingEventData 
} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationStackProp, NavigationStackScreenComponent  } from "react-navigation-stack";
import { SpotifyContext } from '../providers/Spotify';
import { SearchBar } from 'react-native-elements';
import ActionBarImage from '../navigation/ActionBarImage';
import {baseServerUrl} from '../../secret';
import { IEvent, IPlaylist, ITrack } from '../models/Event';
import VoteModal from '../Vote/VoteModal';

// tslint:disable-next-line: interface-name
interface VoteScreenProps {
    navigation: NavigationStackProp<{name: string}>
}

const VoteScreen: NavigationStackScreenComponent<VoteScreenProps> = props => {
  const [voteDisplay, setVoteDisplay] = useState([]);
  const {spotify} = useContext(SpotifyContext);
  const [value, setValue] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [event, setEvent] = useState<IEvent>();
  const [results, setResults] = useState<SpotifyApi.SearchResponse>();
  const [playlist, setPlaylist] = useState<IPlaylist>();

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

  const getPlaylist = async () => {
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
        console.log(json)
        setPlaylist(json);
      }
    }
  }

  useEffect(() => {
    getPlaylist();
  }, [isVisible])

  useEffect(() => {
    getEvent();
    getPlaylist();
  }, []);

  useEffect(() => {
    if(results) setIsVisible(true);
  }, [results]);


  const onSearch = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    spotify.search(e.nativeEvent.text, ["track"], {limit: 20})
      .then(response => setResults(response));
  }

    const upVote = async (songID) => {
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
              id: songID,
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
                onChangeText={text => setValue(text)}
                value={value}
                onSubmitEditing={onSearch}
            />
            {results && <VoteModal 
              openState={[isVisible, setIsVisible]} 
              resultsState={[results, setResults]}
              searchState={[value, setValue]}
              />}
              
            <ScrollView style={styles.containerCardCard}>
              {playlist &&               
              <FlatList
                data={playlist.tracks}
                renderItem={({item}) => <PlaylistItem track={item}/>}
                keyExtractor={(item) => item._id}
              />}

            </ScrollView>
        </View>
    )
}

const PlaylistItem: FC<{track: ITrack}> = ({track:{uri}}) => {
  const {spotify} = useContext(SpotifyContext);
  const [track, setTrack] = useState<SpotifyApi.SingleTrackResponse>();
  useEffect(() => {
    console.log({uri});
    if(uri){
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
      </View>}
      
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
