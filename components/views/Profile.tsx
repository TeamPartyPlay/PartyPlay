import React from 'react';
import { Button, Image, Text, View, StyleSheet } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';


type Props = {
    _id: string
}

const ProfileScreen: NavigationStackScreenComponent<Props> = props => {
    const {navigate} = props.navigation;
    return(
      <View style={ProfileStyles.container}>
        <Image
          style={{ 
            width: undefined, 
          }}
          source={require("../../assets/users/kopec_david.jpeg")}
          resizeMode="cover"
        />
        <Text style={ProfileStyles.title}>David Kopec</Text>
        <Text style={ProfileStyles.subtitle}>Listening to Nickelback @dartmouth</Text>
        <View style={{flex: 2, flexDirection: "row", justifyContent: "center"}}>
          <View style={{flex: 2, flexDirection: "column"}}>
            <Text>Followers</Text>
            <Text>365</Text>
          </View>
          <View style={{flex: 2, flexDirection: "column"}}>
            <Text>Following</Text>
            <Text>365</Text>
          </View>
        </View>
        
        <Button
            title="Go Activity"
            onPress={() => navigate('Activity')}
        />
      </View>
    )
  }

const ProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // backgroundColor: "skyblue"
  },
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 18,
    color: "gray",
    fontWeight: "100"
  }
})
  
ProfileScreen.navigationOptions = {
  title: 'Profile'
}

export default ProfileScreen;