import React, { createContext, FC, PropsWithChildren, useState, useEffect } from "react";
import { AsyncStorage } from "react-native";


const EventContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(undefined);

const EventProvider: FC<PropsWithChildren<{}>> = ({children}) => {
    const [eventToken, setEventToken] = useState("");

    useEffect(() => {
        AsyncStorage.getItem("eventToken", (error, result) => {
            if(error){
                console.error(error);
            } else {
                setEventToken(result);
            }
        })
        return () => {
            AsyncStorage.setItem("eventToken", eventToken);
        }
    }, [])

    useEffect(() => {
        if(eventToken){
            AsyncStorage.setItem("eventToken", eventToken);
        }
    }, [eventToken]);

    return(
        <EventContext.Provider value={[eventToken, setEventToken]} >
            {children}
        </EventContext.Provider>
    )
}

export {EventContext, EventProvider};
