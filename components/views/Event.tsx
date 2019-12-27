import React from 'react';
import { Text, View } from "react-native";
import { NavigationStackProp, NavigationStackScreenComponent  } from "react-navigation-stack";


// tslint:disable-next-line: interface-name
interface EventScreenProps {
    navigation: NavigationStackProp<{name: string}>
}

// const styles = 

const EventScreen: NavigationStackScreenComponent<EventScreenProps> = props => {

    return(
        <View>
            <Text>This is the event screen</Text>
        </View>
    )

}

EventScreen.navigationOptions = {
    title: 'Event Name',
}

export default EventScreen;