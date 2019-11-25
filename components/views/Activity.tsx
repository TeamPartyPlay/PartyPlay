import React from 'react';
import { View, Button, AsyncStorage } from "react-native";
import { 
    NavigationStackProp,
    NavigationStackScreenComponent 
} from "react-navigation-stack"


// tslint:disable-next-line: interface-name
interface Props {
    navigation: NavigationStackProp<{name: string}>
}

const ActivityScreen: NavigationStackScreenComponent<Props> = props => {
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

ActivityScreen.navigationOptions = {
    title: "Activity"
}

export default ActivityScreen;
