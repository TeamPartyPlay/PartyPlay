import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { NavigationStackScreenComponent, NavigationStackProp } from 'react-navigation-stack';

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

/*class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}*/

export default AuthLoadingScreen;