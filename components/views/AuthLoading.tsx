import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import { NavigationStackProp, NavigationStackScreenComponent  } from 'react-navigation-stack';

type Props = {
    navigation: NavigationStackProp<{name: string}>
}

const AuthLoadingScreen: NavigationStackScreenComponent<Props> = ({navigation}) => {
    useEffect(() => {
        AsyncStorage.getItem('userToken')
        .then((userToken)=>{
            navigation.navigate(userToken ? 'App' : 'Auth');
        });
    }, [])
    return (
        <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
    );
}

export default AuthLoadingScreen;