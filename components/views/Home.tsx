import { NavigationStackProp, NavigationStackScreenComponent} from 'react-navigation-stack';
import { Button } from 'react-native';
import React from 'react';

type HomeScreenProps = {
  navigation: NavigationStackProp<{name: string}>
}

const HomeScreen: NavigationStackScreenComponent<HomeScreenProps> = props => {
  const {navigate} = props.navigation;
  return(
    <Button
        title="Go to Jane's profile"
        onPress={() => navigate('Profile', {name: 'Jane'})}
      />
  )
}

HomeScreen.navigationOptions = {
  title: 'Home'
}

export default HomeScreen;