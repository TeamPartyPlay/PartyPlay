import React, { useState } from "react";
import { Button, View } from "react-native";
import { NavigationStackProp, NavigationStackScreenComponent } from "react-navigation-stack";
import { Input } from "react-native-elements";



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
        <View>
            <Input
                placeholder="Username" 
                label="Username"
                value={username} 
                onChangeText={text => setUsername(text)}
            />
            <Input
                placeholder="Email" 
                label="Email"
                value={email} 
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder="Password" 
                label="Password"
                value={password}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
            />
            <Input
                placeholder="Confirm Password" 
                label="Confirm Password"
                value={confirmPassword}
                secureTextEntry={true}
                onChangeText={text => setConfirmPassword(text)}
            />
            <Button
                title="Finish Sign Up"
                onPress={signUp}
            />
        </View>
    )
}

SignUpScreen.navigationOptions = {
    title: 'Sign Up'
}

export default SignUpScreen;