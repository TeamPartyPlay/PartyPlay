import React, { createContext, FC, PropsWithChildren, useState, useEffect } from "react";
import { AsyncStorage } from "react-native";


const UserContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(undefined);

const UserProvider: FC<PropsWithChildren<{}>> = ({children}) => {
    const [userToken, setUserToken] = useState("");

    useEffect(() => {
        AsyncStorage.getItem("userToken", (error, result) => {
            if(error){
                console.error(error);
            } else {
                setUserToken(result);
            }
        })
        return () => {
            AsyncStorage.setItem("userToken", userToken);
        }
    }, [])

    useEffect(() => {
        if(userToken){
            AsyncStorage.setItem("userToken", userToken);
        }
    }, [userToken]);

    return(
        <UserContext.Provider value={[userToken, setUserToken]} >
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider};