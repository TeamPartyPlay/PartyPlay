import React, { useState, useContext, useEffect } from "react"
import { AsyncStorage, Button, View, StyleSheet, Alert } from "react-native";
import { NavigationStackProp, NavigationStackScreenComponent } from "react-navigation-stack";
import { Image, Text } from "react-native-elements";
import MaterialButtonDark from "../MaterialButtonDark";
import MaterialIconTextbox3 from "../MaterialIconTextbox3";
import MaterialIconTextbox4 from "../MaterialIconTextbox4";
import { UserContext } from "../providers/User";


type Props = {
    navigation: NavigationStackProp<{name: string}>
}

const LoginScreen: NavigationStackScreenComponent<Props> = props => {
    const [userToken, setUserToken] = useContext(UserContext)
    const { navigate } = props.navigation;
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
      console.log({username, password});
    }, [username, password])

    const signUp = async () => {
        navigate('SignUp');
    }

    const signIn = async () => {
      try {
          const res = await fetch('https://partyplayserver.herokuapp.com/api/user/login', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  username,
                  password
              })
          });
          console.log(res.status)
          if(res.status === 200){
            console.log("Login Successful")
            const cookieStr: string = res.headers['map']['set-cookie'];
            const tokenStr: string = cookieStr.split(';')[0];
            const token: string = tokenStr.split("=")[1];
            setUserToken(token);
            navigate('App');
          } else {
            Alert.alert('Login Failed!');
          }
      } catch (error) {
          console.error(error);
      }
    }
    return(
        <View style={styles.container}>
            <View style={styles.group4}>
                <View style={styles.group3}>
                <View style={styles.group2}>
                    <View style={styles.group5}>
                    <View style={styles.rect}>
                        <Image
                            source={require("../../assets/partyPlayLogoWide.png")}
                            resizeMode="contain"
                            style={styles.image}
                        />
                        <Text style={styles.welcomeBack}>Welcome Back</Text>
                        <MaterialIconTextbox3
                            style={styles.materialIconTextbox32}
                            onChangeText={text => setUsername(text)}
                        />
                        <MaterialIconTextbox4
                            style={styles.materialIconTextbox4}
                            onChangeText={text => setPassword(text)}
                        />
                        <MaterialButtonDark
                            title="Login"
                            style={styles.materialButtonDark}
                            onPress={signIn}
                        />
                    </View>
                    </View>
                <Button title="Sign Up!" onPress={signUp} />
                </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 812
    },
    group4: {
      width: '100%',
      height: 812
    },
    group3: {
      width: '100%',
      height: 812
    },
    group2: {
      width: '100%',
      height: 812
    },
    group5: {
      width: '100%',
      height: 812,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    rect: {
      width: '100%',
      height: 812,
      backgroundColor: "rgba(51,51,61,1)",
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center'
    },
    image: {
      width: 264,
      height: 96,
      alignContent: 'center'
    },
    welcomeBack: {
      color: "white",
      fontSize: 20,
      marginTop: 21,
    },
    materialIconTextbox32: {
      width: 271,
      height: 43,
      marginTop: 16,
    },
    materialIconTextbox4: {
      width: 271,
      height: 43,
      marginTop: 27,
    },
    materialButtonDark: {
      width: 271,
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
    }
  });

LoginScreen.navigationOptions = {
    headerStyle:{
        height: 0,
        backgroundColor: '#33333D'
    }
  }

export default LoginScreen;