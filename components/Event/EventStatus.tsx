import React, { FC, useState, useContext, useEffect } from 'react';
import { View, AsyncStorage } from 'react-native';
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
                ? <Button title="exit" onPress={() => changeStatus('exit')} />
                : <Button title="join" onPress={() => changeStatus('join')} />
            }
        </View>
    )
}


export default EventStatus;