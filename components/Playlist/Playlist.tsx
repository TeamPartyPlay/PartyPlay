import React, { useState, useContext, createRef } from 'react'; 
import { Button, View, Modal } from 'react-native';
import { Input, Overlay } from 'react-native-elements';
import { PlaylistContext } from '../providers/Spotify';
import Song from './Song';


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
interface CreatePlaylistOverlayProps {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

const CreatePlaylistOverlay: React.FC<CreatePlaylistOverlayProps> = ({visible, setVisible}) => {
    const { createPlaylist } = useContext(PlaylistContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const inputName = createRef<Input>();
    const inputDescription = createRef<Input>();

    const onSubmit = () => {
        //createPlaylist({name, description, public: false, collaborative: false});
        setVisible(false);
    }

    return(
        <Modal visible={visible}>
            <View>
                <Input ref={inputName} placeholder="Name" label="Name" />
                <Input ref={inputDescription} placeholder="Description" label="Description"/>
                <Button onPress={onSubmit} title="Submit"/>
                <Button onPress={() => setVisible(false)} title="Clear" />
            </View>
        </Modal>
        
    )
}

export {Playlist, CreatePlaylistOverlay};