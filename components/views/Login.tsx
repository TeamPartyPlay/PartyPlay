import React, { useState } from "react"
import { AsyncStorage, Button, View } from "react-native";
import { NavigationStackProp, NavigationStackScreenComponent } from "react-navigation-stack";
import { Input } from "react-native-elements";


type Props = {
    navigation: NavigationStackProp<{name: string}>
}

const LoginScreen: NavigationStackScreenComponent<Props> = props => {
    const {navigate} = props.navigation;
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const signUp = async () => {
        
        navigate('App');
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
            })
            // console.log(res);
            const cookieStr: string = res.headers['map']['set-cookie'];
            const tokenStr: string = cookieStr.split(';')[0];
            const token: string = tokenStr.split("=")[1];
            await AsyncStorage.setItem('userToken', token);
            navigate('App');

        } catch (error) {
            console.log(error);
        }
    }
    return(
        <View style={{flexDirection: 'column', justifyContent: 'space-around'}}>
            <Input
                placeholder="Username" 
                label="Username"
                value={username} 
                onChangeText={text => setUsername(text)}
            />
            <Input
                placeholder="Password" 
                label="Password"
                value={password} 
                onChangeText={text => setPassword(text)}
            />
            <Button title="Sign Up!" onPress={signUp} />
            <Button title="Sign in!" onPress={signIn} />
        </View>
    )
}

LoginScreen.navigationOptions = {
    title: "Sign In"
}

export default LoginScreen;