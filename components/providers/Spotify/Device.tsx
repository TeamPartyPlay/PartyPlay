import React, { createContext, FC, ReactNode, useContext } from "react";
import { SpotifyContext } from "./Spotify";

/*interface DeviceContextProps {
    // currentDevice: () => SpotifyApi.UserDevice,
    devices: () => Promise<SpotifyApi.UserDevicesResponse>,
}*/

interface DeviceProviderProps {
    children?: ReactNode,
}

const DeviceContext = createContext<DeviceProviderProps>(null);

const DeviceProvider: FC<DeviceProviderProps> = ({children}) => {
    const {spotify} = useContext(SpotifyContext);
    return (
        <DeviceContext.Provider value={}>
            {children}
        </DeviceContext.Provider>
    )
}