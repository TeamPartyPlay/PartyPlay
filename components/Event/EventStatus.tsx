import React, { FC, useState, useContext, useEffect } from 'react';
import { View, AsyncStorage, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import {baseServerUrl} from '../../secret';

interface IEventStatus {
    initialStatus: boolean,
    eventId: string,
}

const EventStatus: FC<IEventStatus> = ({initialStatus, eventId}) => {
    const [status, setStatus] = useState<boolean>(false);

    const changeStatus = async (newStatus: "join" | "exit") => {
        const userToken = await AsyncStorage.getItem('userToken');
        const res = await fetch(`${baseServerUrl}/api/event/${newStatus}/${eventId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: userToken
            })
        })
        if(res.status === 200){
            if(newStatus === "join"){
                const cookieStr: string = res.headers['map']['set-cookie'];
                const tokenStr: string = cookieStr.split(';')[0];
                const token: string = tokenStr.split("=")[1];
                await AsyncStorage.setItem('eventToken', token)
                setStatus(true);
            } else if(newStatus === 'exit'){
                await AsyncStorage.removeItem('eventToken')
                setStatus(false);
            }
        }
    }

    return(
        <View>
            {status
                ? <TouchableOpacity style={styles.eventCardActionButton2} onPress={() => changeStatus('exit')}>
                    <Text style={styles.eventCardActionText2}>EXIT</Text>
                  </TouchableOpacity>
                : <TouchableOpacity style={styles.eventCardActionButton2} onPress={() => changeStatus('join')}>
                    <Text style={styles.eventCardActionText2}>JOIN</Text>
                  </TouchableOpacity>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    eventCardActionButton2: {
      paddingLeft: 0,
    },
    eventCardActionText2: {
      color: "#29b473",
      opacity: 0.9,
      fontSize: 24,
    },


});


export default EventStatus;