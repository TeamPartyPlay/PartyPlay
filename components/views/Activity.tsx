import React from 'react';
import { AsyncStorage, Button, View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { 
    NavigationStackProp,
    NavigationStackScreenComponent, 
    Header
} from "react-navigation-stack"
import ActionBarImage from '../navigation/ActionBarImage';


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
        <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          <Button
            title="Profile" 
            onPress={showProfile} 
          />
          <Button
            title="Sign Out"
            onPress={signOut} 
          />
        </View>
        <View style={[styles.container]}>
          <View style={styles.cardBody}>
            <View style={styles.bodyContent}>
              <Text style={styles.titleStyle}>Title goes here</Text>
              <Text style={styles.subtitleStyle}>Subtitle here</Text>
            </View>
            <Image
              source={require("../../assets/users/kopec_david.jpeg")}
              style={styles.cardItemImagePlace}
            ></Image>
          </View>
          <View style={styles.actionBody}>
            <TouchableOpacity style={styles.actionButton1}>
              <Text style={styles.actionText1}>ACTION 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton2}>
              <Text style={styles.actionText2}>ACTION 2</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    elevation: 3,
    borderRadius: 2,
    borderColor: "#CCC",
    borderWidth: 1,
    shadowOffset: {
      height: 2,
      width: -2
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: "hidden"
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bodyContent: {
    flex: 1,
    padding: 16,
    paddingTop: 24
  },
  titleStyle: {
    color: "#000",
    paddingBottom: 12,
    fontSize: 24,
  },
  subtitleStyle: {
    color: "#000",
    opacity: 0.5,
    fontSize: 14,
    lineHeight: 16
  },
  cardItemImagePlace: {
    width: 80,
    height: 80,
    backgroundColor: "#ccc",
    margin: 16
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
    color: "#000",
    opacity: 0.9,
    fontSize: 14
  },
  actionButton2: {
    height: 36,
    padding: 8
  },
  actionText2: {
    color: "#000",
    opacity: 0.9,
    fontSize: 14
  }
});
ActivityScreen.navigationOptions = {
  headerTitle: <ActionBarImage />,
  headerStyle:{
      height: 75,
      backgroundColor: '#33333D'
  }
}

export default ActivityScreen;
