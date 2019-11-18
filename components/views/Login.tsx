import React from "react"
import { NavigationStackScreenComponent, NavigationStackProp } from "react-navigation-stack";
import { View, Text } from "react-native";

type Props = {
    navigation: NavigationStackProp<{name: string}>
}

const LoginScreen: NavigationStackScreenComponent<Props> = props => {
    return(
        <View>
            <Text>LoginScreen</Text>
        </View>
    )
}

export default LoginScreen;