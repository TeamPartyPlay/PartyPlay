import React from 'react';
import { Button, Image, Text, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { Icon } from 'react-native-elements';
import ActionBarImage from '../navigation/ActionBarImage';
import { ScrollView } from 'react-native-gesture-handler';


type Props = {
    _id: string
}

const ProfileScreen: NavigationStackScreenComponent<Props> = props => {
  const {navigate} = props.navigation;

  const signOut = async () => {
    await AsyncStorage.clear();
    navigate('Auth');
  };
  
    return(
    <View style={ProfileStyles.containerPrime}>
      <View style={[ProfileStyles.container]}>
        <Image
          source={require("../../assets/users/ProfileIMG.png")}
          style={ProfileStyles.cardItemImagePlace}>
        </Image>
        <ScrollView>
          <View style={ProfileStyles.bodyContent}>
            <Text style={ProfileStyles.titleStyle}>David Kopec</Text>
            <Text style={ProfileStyles.subtitleStyle}>Listening to Nickelback @dartmouth</Text>
          </View>
          
          <View style={ProfileStyles.body2}>
            <Text style={ProfileStyles.bodyText}>
              BuilderX is a screen design tool which codes React Native for you
              which design without boundaries, the code is generated simultaneously.
              Save your designed components as symbol and then simply add it to your
              design next time. Live preview works on real device. Shout out to the
              Expo team to make it happen.BuilderX is a screen design tool which codes React Native for you
              which design without boundaries, the code is generated simultaneously.
              Save your designed components as symbol and then simply add it to your
              design next time. Live preview works on real device. Shout out to the
              Expo team to make it happen.BuilderX is a screen design tool which codes React Native for you
              which design without boundaries, the code is generated simultaneously.
              Save your designed components as symbol and then simply add it to your
              design next time. Live preview works on real device. Shout out to the
              Expo team to make it happen.BuilderX is a screen design tool which codes React Native for you
              which design without boundaries, the code is generated simultaneously.
              Save your designed components as symbol and then simply add it to your
              design next time. Live preview works on real device. Shout out to the
              Expo team to make it happen.
            </Text>
          </View>
        </ScrollView>
        
        <TouchableOpacity style={[ProfileStyles.containerLogin, ProfileStyles.materialButtonDark]} onPress={signOut}>
          <Text style={ProfileStyles.captionClose}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
      
    
    
    )
  }

const ProfileStyles = StyleSheet.create({
  captionClose: {
    color: "#fff",
    fontSize: 14,
  },  
  containerLogin: {
    backgroundColor: "#212121",
    position: 'absolute',
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 2,
    shadowOffset: {
        height: 5,
        width: 5
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
},
materialButtonDark: {
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    backgroundColor: "rgba(41,180,115,1)",
    borderRadius: 100,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.3,
    marginTop: 22,
    paddingBottom: 10,
  },
  containerPrime: {
    flex: 1
  },
  container: {
    backgroundColor: "#33333D",
    flexWrap: "nowrap",
    elevation: 3,
    width: "100%",
    height: "100%"
  },
  cardItemImagePlace: {
    width: "100%",
    maxHeight: 300,
    backgroundColor: "#ccc",
    minHeight: 210
  },
  bodyContent: {
    justifyContent: "center",
    padding: 16,
    paddingTop: 24
  },
  titleStyle: {
    color: "#FFF",
    paddingBottom: 12,
    fontSize: 24,
  },
  subtitleStyle: {
    color: "#FFF",
    opacity: 0.5,
    fontSize: 14,
    lineHeight: 16
  },
  actionBody: {
    flexDirection: "row",
    padding: 8
  },
  actionButton1: {
    height: 36,
    padding: 8
  },
  actionText1: {
    color: "#FFF",
    opacity: 0.9,
    fontSize: 14
  },
  actionButton2: {
    height: 36,
    padding: 8
  },
  actionText2: {
    color: "#FFF",
    opacity: 0.9,
    fontSize: 14
  },
  actionButton3: {
    height: 36,
    position: "absolute",
    right: 8,
    bottom: 12,
    padding: 8
  },
  iconStyle: {
    fontSize: 24,
    color: "#FFF",
    opacity: 0.7
  },
  body2: {
    padding: 16,
    paddingTop: 8
  },
  bodyText: {
    color: "#FFF",
    fontSize: 14,
    lineHeight: 20
  }
})
  
ProfileScreen.navigationOptions = {
  headerTitle: <ActionBarImage />,
  headerStyle:{
      height: 75,
      backgroundColor: '#33333D'
  }
}

export default ProfileScreen;