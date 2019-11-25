import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { NavigationStackProp, NavigationStackScreenComponent } from "react-navigation-stack";



// tslint:disable-next-line: interface-name
interface SignUpScreenProps {
    navigation: NavigationStackProp<{name: string}>
}

const SignUpScreen: NavigationStackScreenComponent<SignUpScreenProps> = props => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    return(
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
                <Text>Username: </Text>
                <TextInput
                    style={{
                        borderBottomColor: 'blue',
                        borderBottomWidth: 1,
                    }} 
                    value={username} 
                    onChangeText={text => setUsername(text)} 
                />
            </View>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
                <Text>Password: </Text>
                <TextInput 
                    style={{
                        borderBottomColor: 'blue',
                        borderBottomWidth: 1,
                    }} 
                    value={password} 
                    onChangeText={text => setPassword(text)} 
                />
            </View>
        </View>
    )
}

SignUpScreen.navigationOptions = {
    title: 'Sign Up'
}

export default SignUpScreen;