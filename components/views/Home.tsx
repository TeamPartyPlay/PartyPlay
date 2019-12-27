import React from 'react';
import { AsyncStorage, Button, View, ButtonProps} from 'react-native';
import { NavigationStackProp, NavigationStackScreenComponent} from 'react-navigation-stack';



// tslint:disable-next-line: interface-name
interface HomeScreenProps {
  navigation: NavigationStackProp<{name: string}>
}

const HomeScreen: NavigationStackScreenComponent<HomeScreenProps> = props => {
  const {navigate} = props.navigation;

  const signOut = async () => {
    await AsyncStorage.clear();
    navigate('Auth');
  };

  const showProfile =  async () => {
    navigate('Profile');
  }

  return(
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Button
          title="Profile" 
          onPress={showProfile} 
        />
        <Button
          title="Sign Out"
          onPress={signOut} 
        />
      </View>
    </View>
  )
}

HomeScreen.navigationOptions = {
  title: 'Welcome to the app!'
}

export default HomeScreen;