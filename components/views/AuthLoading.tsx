import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import { NavigationStackProp, NavigationStackScreenComponent  } from 'react-navigation-stack';

// tslint:disable-next-line: interface-name
interface Props {
    navigation: NavigationStackProp<{name: string}>
}

const AuthLoadingScreen: NavigationStackScreenComponent<Props> = ({navigation}) => {
    
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('userToken')
        .then((userToken)=>{
            navigation.navigate(userToken ? 'App' : 'Auth');
        });
    }, [mounted]);

    return (
        <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
    );
}

export default AuthLoadingScreen;