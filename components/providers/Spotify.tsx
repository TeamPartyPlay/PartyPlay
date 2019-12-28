import { encode } from 'base-64';
import { AuthSession } from "expo";
import React, { createContext, FC, ReactNode, useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import SpotifyWebApi from 'spotify-web-api-js';
import { cId, cSecret, rUri } from '../../secret';


const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                   'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                   'playlist-modify-private','user-read-recently-played','user-top-read'];
const scopes = scopesArr.join(' ');

const spotify = new SpotifyWebApi();

const SpotifyContextDefaultValues = {
    accessToken: '',
    spotify,
    getAuthorizationCode: async () : Promise<void> => null,
    refreshTokens: async () : Promise<void> => null,
}

const SpotifyContext = createContext(SpotifyContextDefaultValues);

// tslint:disable-next-line: interface-name
interface SpotifyProps {
    children?: ReactNode,
}

/**
 * The point of this provider is provided a context so that 
 * a user will be able to login and use the Spotify API.
 */
const SpotifyProvider: FC<SpotifyProps> = ({children}) => {
    const [clientId, setClientId] = useState(cId);
    const [clientSecret, setClientSecret] = useState(cSecret);
    const [redirectUri, setRedirectUri ] = useState(rUri ? rUri : AuthSession.getRedirectUrl())
    const [authCode, setAuthCode] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [expiration, setExpiration] = useState(null);

    useEffect(() => {
        const promises: Array<Promise<string>> = [
            AsyncStorage.getItem('accessToken'), 
            AsyncStorage.getItem('refreshToken'),
            AsyncStorage.getItem('expiration'), 
            AsyncStorage.getItem('authCode')
        ];
        Promise.all(promises).then(res => {
            const [AccessToken, RefreshToken, Expiration, AuthCode] = res;
            console.log(res);
            setAccessToken(AccessToken);
            setRefreshToken(RefreshToken);
            setExpiration(Expiration);
            setAuthCode(AuthCode);
        });

    }, []);

    useEffect(() => {
        console.log("Access Token: ", accessToken);
        if(accessToken) {
            AsyncStorage.setItem('accessToken', accessToken);
            spotify.setAccessToken(accessToken);
        }
    }, [accessToken]);

    useEffect(() => {
        if(refreshToken) {
            AsyncStorage.setItem('refreshToken', refreshToken);
        }
    }, [refreshToken]);

    useEffect(() => {
        console.log(expiration < (new Date()).toISOString());
        if(expiration) {
            AsyncStorage.setItem('expiration', expiration);
        }
    }, [expiration]);

    useEffect(() => {
        refreshTokens();
    }, [expiration < (new Date()).toISOString()]);


    useEffect(()=>{
        if (authCode && !accessToken && !refreshToken && !expiration){
            getTokens()
        }
    }, [authCode])

    const removeTokens = () => {
        AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'expiration', 'authCode'])
    }

    const getTokens = async () : Promise<{accessToken: string, refreshToken: string, expiration: string }> => {
        console.log("Get Tokens");
        if(accessToken && refreshToken && expiration) {
            // console.log(accessToken, refreshToken, expiration)
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
            const {access_token, refresh_token, expires_in, error} = await response.json();
            const Expiration = new Date (new Date().getTime() + expires_in * 1000);
            if (error) {
                removeTokens();
            } else {
                console.log(access_token, refresh_token, expires_in, error);
                setAccessToken(access_token);
                setRefreshToken(refresh_token);
                setExpiration(Expiration.toISOString());
            }
            
            return {accessToken: access_token, refreshToken: refresh_token, expiration: expires_in}
        }
    }

    const refreshTokens = async () : Promise<void> => {
        try {
            const encodedClient = encode(`${clientId}:${clientSecret}`);
            const response = await fetch('https://accounts.spotify.com/api/token', {
              method: 'POST',
              headers: {
                Authorization: `Basic ${encodedClient}`,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}`,
            });
            
            const {access_token, refresh_token, expires_in, error} = await response.json();
            console.log(access_token, refresh_token, expires_in, error);
            if (error) {
                getTokens()
            } else {
                const Expiration = new Date (new Date().getTime() + expires_in * 1000);
                setAccessToken(access_token);
                setRefreshToken(refresh_token);
                setExpiration(Expiration.toISOString());
            }
            
          } catch (err) {
            console.error(err)
          }
    }
    
    const getAuthorizationCode = async () : Promise<void> => {
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

    return(
        <SpotifyContext.Provider value={({ refreshTokens, getAuthorizationCode, accessToken, spotify })}>
            {children}
        </SpotifyContext.Provider>
    )
}

export {SpotifyContext, SpotifyProvider};
