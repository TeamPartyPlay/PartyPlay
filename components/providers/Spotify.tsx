import { encode } from 'base-64';
import { AuthSession } from "expo";
import React, { createContext, FC, ReactNode, useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import { cId, cSecret, rUri } from '../../secret';
const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                   'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                   'playlist-modify-private','user-read-recently-played','user-top-read'];
const scopes = scopesArr.join(' ');

const SpotifyContextDefaultValues = {
    accessToken: '',
    getAuthorizationCode: () => console.log("default"),
    refreshTokens: () => console.log("default"),
}

const SpotifyContext = createContext(SpotifyContextDefaultValues);

interface SpotifyProps {
    children?: ReactNode,
}

const findInStorage = (async (key: string) => await AsyncStorage.getItem(key));

const SpotifyProvider: FC<SpotifyProps> = ({children}) => {
    const [clientId, setClientId] = useState(cId);
    const [clientSecret, setClientSecret] = useState(cSecret);
    const [redirectUri, setRedirectUri ] = useState(rUri ? rUri : AuthSession.getRedirectUrl())
    const [authCode, setAuthCode] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [expiration, setExpiration] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setAccessToken(await AsyncStorage.getItem('accessToken'));
                setRefreshToken(await AsyncStorage.getItem('refreshToken'));
                setExpiration(await AsyncStorage.getItem('expiration'));
                setAuthCode(await AsyncStorage.getItem('authCode')); 
            } catch (error) {
                console.log(error)
            }

        })();
    }, []);

    useEffect(()=>{
        if (authCode && !accessToken && !refreshToken && !expiration){
            getTokens()
        }
    }, [authCode])

    const getTokens = async () : Promise<{accessToken: string, refreshToken: string, expiration: string }> => {
        if(accessToken && refreshToken && expiration) {
            console.log(accessToken, refreshToken, expiration)
            return {accessToken, refreshToken, expiration}
        } else {
            const encodedClient = encode(`${clientId}:${clientSecret}`);
            const response = await fetch('https://accounts.spotify.com/api/token',{
                method: 'POST',
                headers: {
                Authorization: `Basic ${encodedClient}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=authorization_code&code=${authCode}&redirect_uri=${
                redirectUri
                }`,
            });
            const {access_token, refresh_token, expires_in} = await response.json();
            const Expiration = new Date (new Date().getTime() + expires_in * 1000);
            setAccessToken(access_token);
            setRefreshToken(refresh_token);
            setExpiration(Expiration);
            await AsyncStorage.setItem('accessToken', access_token);
            await AsyncStorage.setItem('refreshToken', refresh_token);
            await AsyncStorage.setItem('expiration', Expiration.toISOString());
            return {accessToken: access_token, refreshToken: refresh_token, expiration: expires_in}
        }
    }
    const refreshTokens = async () => {
        return null;
    }
    
    const getAuthorizationCode = async () => {
        try {
            const result = await AuthSession.startAsync({
              authUrl:
                'https://accounts.spotify.com/authorize' +
                '?response_type=code' +
                '&client_id=' +
                clientId +
                (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
                '&redirect_uri=' +
                encodeURIComponent(redirectUri),
            });
            if (result.type === 'success'){
                const { code } = result.params;
                setAuthCode(code);
                AsyncStorage.setItem('authCode', code);
            }
          } catch (err) {
            console.error(err)
          }
    }
    useEffect(() => {
        return () => {
            //AsyncStorage.setItem()
        }
    }, []);
    return(
        <SpotifyContext.Provider value={({ refreshTokens, getAuthorizationCode, accessToken})}>
            {children}
        </SpotifyContext.Provider>
    )
}

export {SpotifyContext, SpotifyProvider};
