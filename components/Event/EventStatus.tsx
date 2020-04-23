import React, { FC, useReducer, useState, useContext } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import {baseServerUrl} from '../../secret';
import { UserContext } from '../providers/User';
import { EventContext } from '../providers/Event';

interface IEventStatus {
    initialStatus: boolean,
    eventId: string,
}

const EventStatus: FC<IEventStatus> = ({initialStatus, eventId}) => {
    const [userToken, setUserToken] = useContext(UserContext);
    const [eventToken, setEventToken] = useContext(EventContext);
    const [status, setStatus] = useState<boolean>(initialStatus);

    const changeStatus = async (newStatus: "join" | "exit") => {
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
        console.log(res);
        if(res.status === 200){
            if(newStatus === "join"){
                const cookieStr: string = res.headers['map']['set-cookie'];
                const tokenStr: string = cookieStr.split(';')[0];
                const token: string = tokenStr.split("=")[1];
                setEventToken(token);
                setStatus(true);
            } else if(newStatus === 'exit'){
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