import { Text, View } from "react-native";
import Modal, { ModalContent, ModalTitle, BottomModal, ModalButton } from 'react-native-modals';
import { useState } from "react";


const EventAdd = () => {
    const [visible, setVisible] = useState(false)
    return(
        <Modal>
            <ModalTitle>
                This is Add Event
            </ModalTitle>
        </Modal>
    )
}

export default EventAdd;