import React from 'react';
import { Text, View, Button} from "react-native";
import { NavigationStackProp, NavigationStackScreenComponent  } from "react-navigation-stack";


// tslint:disable-next-line: interface-name
interface EventsScreenProps {
    navigation: NavigationStackProp<{name: string}>
}

// const styles = 

const EventsScreen: NavigationStackScreenComponent<EventsScreenProps> = props => {
    const { navigate } = props.navigation;
    return(
        <View>
            <Text>This is the events screen</Text>
            <Button title="Go To A Event" onPress={()=>{navigate('Event')}}/>
        </View>
    )

}

EventsScreen.navigationOptions = {
    title: 'Events',
}

export default EventsScreen;