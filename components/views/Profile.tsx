import React from 'react';
import { Button } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';



type Props = {
    _id: string
}

const ProfileScreen: NavigationStackScreenComponent<Props> = props => {
    const {navigate} = props.navigation;
    return(
      <Button
          title="Go Home"
          onPress={() => navigate('Home')}
        />
    )
  }
  
  ProfileScreen.navigationOptions = {
    title: 'Profile'
  }

export default ProfileScreen;