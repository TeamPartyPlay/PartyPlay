import React, { useContext, useState, useEffect, PropsWithChildren, FC } from 'react';
import { Text, View, Modal, Button, Image, FlatList, StyleSheet, TouchableOpacity, AsyncStorage } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';
import {baseServerUrl} from '../../secret';
import { IEvent } from '../models/Event';

interface IVoteModalProps {
    openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    resultsState: [SpotifyApi.SearchResponse, React.Dispatch<React.SetStateAction<SpotifyApi.SearchResponse>>]
    searchState: [string, React.Dispatch<React.SetStateAction<string>>]
}


const VoteModal: FC<PropsWithChildren<IVoteModalProps>> = ({openState, resultsState, searchState}) => {
    const [open, setOpen] = openState;
    const [results, setResults] = resultsState;
    const [search, setSearch] = searchState;

    const toggle = () => setOpen(!open);

    const onClose = () => {
        setResults(undefined);
        setOpen(false);
        setSearch("");
    }

    const onSubmit = async (track: SpotifyApi.TrackObjectFull) => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const eventToken = await AsyncStorage.getItem('eventToken');
            const res = await fetch('https://partyplayserver.herokuapp.com/api/playlist/add', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uri: track.uri,
                    token: userToken,
                    eventToken
                })
            })
            if(res.status === 200){
                const json =  await res.json();
                onClose();
            }
        } catch (error) {
            console.error(error);
        }
      }

    return(
        <Modal
            animationType = {"fade"}
            transparent = {false}
            visible = {open}
            onRequestClose = {() => {}}
            >
                <FlatList
                    keyExtractor ={(item) => item.id}
                    data={results.tracks.items}
                    renderItem={({ item }) => (
                        <View style={styles.containerCardCard}>
                            <View style={styles.containerCard}>
                                <View style={styles.cardBodyCard}>
                                    <Image
                                        source={{uri: item.album.images[0].url}}
                                        style={styles.cardItemImagePlaceCard}
                                    ></Image>

                                    <View style={styles.bodyContentCard}>
                                        <Text style={styles.titleStyleCard}>{item.name}</Text>
                                        <Text style={styles.subtitleStyleCard}>{item.artists[0].name}</Text>

                                    </View>
                                </View>
                                <Ionicons
                                style={styles.addButton}
                                name="md-add-circle"
                                size={50}
                                color="#ADADB1"
                                onPress={() => onSubmit(item)}
                            />
                            </View>
                        </View>
                    )}

                />
                <View style={{paddingBottom: 36, backgroundColor: '#33333D'}}>
                    <TouchableOpacity style={[styles.containerLogin, styles.materialButtonDark]} onPress={onClose}>
                        <Text style={styles.captionClose}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
    );
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
})

export default VoteModal;