import React, { useState } from "react";
import { Button, View, Image, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { NavigationStackProp, NavigationStackScreenComponent } from "react-navigation-stack";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";



// tslint:disable-next-line: interface-name
interface SignUpScreenProps {
    navigation: NavigationStackProp<{name: string}>
}

const SignUpScreen: NavigationStackScreenComponent<SignUpScreenProps> = props => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const { navigation } = props;

    const signUp = async () => {
        try {
            const res = await fetch('https://partyplayserver.herokuapp.com/api/user/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    confirmPassword,
                    email,
                    password,
                    username,
                })
            })
            if(res.status === 200){
                navigation.goBack();
            } else {
                throw Error('Something well wrong')
            }
        } catch (error) {
            console.log(error);
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
                        <Text style={styles.signUp}>Sign Up!</Text>
                        <View style={[styles.containerText]}>
                          <Icon name="ios-person" style={styles.iconStyleText}></Icon>
                          <TextInput placeholder="Username" style={styles.inputStyleText} onChangeText={text => setUsername(text)}></TextInput>
                        </View>
                        <View style={[styles.containerText]}>
                          <Icon name="ios-mail" style={styles.iconStyleText}></Icon>
                          <TextInput placeholder="Email" style={styles.inputStyleText} onChangeText={text => setEmail(text)}></TextInput>
                        </View>
                        <View style={[styles.containerText]}>
                          <Icon name="ios-key" style={styles.iconStyleText}></Icon>
                          <TextInput placeholder="Password" style={styles.inputStyleText} secureTextEntry={true} onChangeText={text => setPassword(text)}></TextInput>
                        </View>
                        <View style={[styles.containerText]}>
                          <Icon name="ios-checkmark" style={styles.iconStyleText}></Icon>
                          <TextInput placeholder="Confirm Password" style={styles.inputStyleText} secureTextEntry={true} onChangeText={text => setConfirmPassword(text)}></TextInput>
                        </View>
                        <TouchableOpacity style={[styles.containerSignUp, styles.materialButtonDark]} onPress={signUp}>
                          <Text style={styles.captionSignUp}>Finish Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
                </View>
            </View>
        </View>



    )
}


const styles = StyleSheet.create({
    containerSignUp: {
      backgroundColor: "#212121",
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
    captionSignUp: {
      color: "#fff",
      fontSize: 14,
    },
    containerText: {
      width: 271,
      backgroundColor: "transparent",
      flexDirection: "row",
      alignItems: "center"
    },
    iconStyleText: {
      color: "#616161",
      fontSize: 24,
      paddingLeft: 8,
      width: 32,
      height: 24
    },
    inputStyleText: {
      flex: 1,
      color: "#000",
      alignSelf: "stretch",
      marginLeft: 16,
      paddingTop: 14,
      paddingRight: 5,
      paddingBottom: 8,
      borderColor: "#D9D5DC",
      borderBottomWidth: 1,
      fontSize: 16,
      lineHeight: 16
    },
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
      signUp: {
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
  
    SignUpScreen.navigationOptions = {
        headerStyle:{
            backgroundColor: '#33333D'
        }
    }

export default SignUpScreen;