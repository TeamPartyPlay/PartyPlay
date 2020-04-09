import React from 'react';
import { Button, Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { Icon } from 'react-native-elements';
import ActionBarImage from '../navigation/ActionBarImage';


type Props = {
    _id: string
}

const ProfileScreen: NavigationStackScreenComponent<Props> = props => {
    const {navigate} = props.navigation;
    return(
    <View style={ProfileStyles.containerPrime}>
      <View style={[ProfileStyles.container]}>
      <Image
        source={require("../../assets/users/kopec_david.jpeg")}
        style={ProfileStyles.cardItemImagePlace}>
      </Image>
      <View style={ProfileStyles.bodyContent}>
        <Text style={ProfileStyles.titleStyle}>David Kopec</Text>
        <Text style={ProfileStyles.subtitleStyle}>Listening to Nickelback @dartmouth</Text>
      </View>
      <View style={ProfileStyles.actionBody}>
        <TouchableOpacity style={ProfileStyles.actionButton1}>
          <Text style={ProfileStyles.actionText1}>ACTION 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ProfileStyles.actionButton2}>
          <Text style={ProfileStyles.actionText2}>ACTION 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ProfileStyles.actionButton3}>
          <Icon name="chevron-up" style={ProfileStyles.iconStyle}></Icon>
        </TouchableOpacity>
      </View>
      <View style={ProfileStyles.body2}>
        <Text style={ProfileStyles.bodyText}>
          BuilderX is a screen design tool which codes React Native for you
          which design without boundaries, the code is generated simultaneously.
          Save your designed components as symbol and then simply add it to your
          design next time. Live preview works on real device. Shout out to the
          Expo team to make it happen.
        </Text>
      </View>
    </View>
    </View>
      
    
    
    )
  }

const ProfileStyles = StyleSheet.create({
  containerPrime: {
    flex: 1
  },
  container: {
    backgroundColor: "#33333D",
    flexWrap: "nowrap",
    elevation: 3,
    borderRadius: 2,
    borderColor: "#CCC",
    borderWidth: 1,
    shadowOffset: {
      height: 2,
      width: -2
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: "hidden",
    width: "100%",
    height: "100%"
  },
  cardItemImagePlace: {
    width: "100%",
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