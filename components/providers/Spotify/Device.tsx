import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { SpotifyContext } from "./Spotify";
import { AsyncStorage } from "react-native";

interface DeviceContextProps {
    devices: () => Promise<SpotifyApi.UserDevicesResponse>,
    currentDevice: string,
    setCurrentDevice: React.Dispatch<React.SetStateAction<string>>,
}

interface DeviceProviderProps {
    children?: ReactNode,
}

const DeviceContext = createContext<DeviceContextProps>(null);

const DeviceProvider: FC<DeviceProviderProps> = ({children}) => {
    const {spotify} = useContext(SpotifyContext);
    const [currentDevice, setCurrentDevice] = useState<string>(null);
    useEffect(() => {
        if(spotify.getAccessToken()){
            AsyncStorage.getItem('currentDevice').then(value => {
                if(value){
                    setCurrentDevice(value);
                } else {
                    spotify.getMyDevices().then(value =>{
                        const d = value.devices.find(device => device.is_active);
                        setCurrentDevice(d.id);
                        AsyncStorage.setItem('currentDevice', d.id);
                    });
                }
            })
            spotify.getMyDevices()
            .then(({devices}) => console.log(devices[0]))
            .catch(err => console.error(err))
        }
    }, [spotify.getAccessToken()])
    return (
        <DeviceContext.Provider value={{
            devices: spotify.getMyDevices,
            currentDevice,
            setCurrentDevice,
        }}>
            {children}
        </DeviceContext.Provider>
    )
}

export { DeviceContext, DeviceProvider };