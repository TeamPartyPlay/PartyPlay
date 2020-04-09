import React, { useState, useContext } from 'react'; 
import { Button, View, Text, Image, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { PlaylistContext } from '../providers/Spotify';
import Song from './Song';
import Modal, { ModalContent, ModalTitle } from 'react-native-modals';


const Playlist: React.FC<{}> = () => {
    const {createPlaylist, clearPlaylist, currentPlaylist} = useContext(PlaylistContext);
    return(
        <View>
            {
                currentPlaylist && 
                currentPlaylist.tracks && 
                currentPlaylist.tracks.items.map(item => {
                    const {track} = item;
                    return(
                        <Song song={track} />
                    )})
            }
        </View>
    )
}

// tslint:disable-next-line: interface-name
interface CreatePlaylistModalProps {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({visible, setVisible}) => {
    const { createPlaylist } = useContext(PlaylistContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const onSubmit = () => {
        if(name && description){
            createPlaylist({name, description, public: false, collaborative: false});
        }
        setVisible(false);
    }

    return(
        <View>
            <Modal
                visible={visible}
                width={0.8}
                modalTitle={<ModalTitle title="Create Playlist"/>}
            >
                
                <ModalContent>
                    <Input 
                        placeholder="Name" 
                        label="Name" 
                        value={name} 
                        onChangeText={text => setName(text)}
                    />
                    <Input
                        placeholder="Description" 
                        label="Description"
                        value={description} 
                        onChangeText={text => setDescription(text)}
                    />
                    <Button onPress={onSubmit} title="Submit"/>
                    <Button onPress={() => setVisible(false)} title="Clear" />
                </ModalContent>
            </Modal>
        </View>
    );
}

export {Playlist, CreatePlaylistModal};