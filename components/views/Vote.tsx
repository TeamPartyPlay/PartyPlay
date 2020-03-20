import React, { useContext, useState } from 'react';
import { Text, View, Modal, Button, Image, FlatList, StyleSheet } from "react-native";
import { NavigationStackProp, NavigationStackScreenComponent  } from "react-navigation-stack";
import { SpotifyContext } from '../providers/Spotify';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';

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

    const mybuttonclick = (songID) => {
        const temp = _.filter(modalDisplay, { key: songID })[0]
        const tempKey = "temp" + temp.key
        //will be replaced with database insert statement
        voteDisplay.push(({ imageURL: temp.imageURL, uri: temp.uri, name: temp.name, artist: temp.artist, key: tempKey }))
        closeModal()
    }

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
                        <View style={styles.container}>
                            <Image
                                style={styles.albumCover}
                                source={{uri: item.imageURL}}
                            />
                            <View style={styles.subcontainer}>
                                <Text style={styles.songTitle}>{item.name}</Text>
                                <Text style={styles.artistName}>{item.artist}</Text>
                            </View>


                            
                            <Ionicons
                                style={styles.addButton}
                                name="md-add-circle" 
                                size={50} 
                                color="#ADADB1" 
                                onPress={() => {mybuttonclick(item.key)}}
                            />
                        </View>
                    )}
                    
                />
                <View>
                    <Button title="Click To Close Modal" onPress = {() => {closeModal()}}/>  
                </View>  
            </Modal>
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
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
    title: 'Vote Room',
}

export default VoteScreen;