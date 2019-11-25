import React from "react"
import { AsyncStorage, Button, View } from "react-native";
import { NavigationStackProp, NavigationStackScreenComponent } from "react-navigation-stack";


type Props = {
    navigation: NavigationStackProp<{name: string}>
}

const LoginScreen: NavigationStackScreenComponent<Props> = props => {
    const {navigate} = props.navigation;

    const signUp = async () => {
        navigate('SignUp')
    }

    const signIn = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        navigate('App');
    }
    return(
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button title="Sign Up!" onPress={signUp} />
            <Button title="Sign in!" onPress={signIn} />
        </View>
    )
}

LoginScreen.navigationOptions = {
    title: "Sign In"
}

export default LoginScreen;