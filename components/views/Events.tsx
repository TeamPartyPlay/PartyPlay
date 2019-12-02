import React from 'react';
import { Text, View, Button, FlatList, StyleSheet} from "react-native";
import { NavigationStackProp, NavigationStackScreenComponent  } from "react-navigation-stack";
import { EventListItem } from '../Event';


// tslint:disable-next-line: interface-name
interface EventsScreenProps {
    navigation: NavigationStackProp<{name: string}>
}

const EventsScreen: NavigationStackScreenComponent<EventsScreenProps> = props => {
    const { navigate } = props.navigation;
    return(
        <View>
            <FlatList
                data={[
                    {key: 'Devin'},
                    {key: 'Dan'},
                    {key: 'Dominic'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                ]}
                renderItem={({item}) => <EventListItem title={item.key}/>}
            />
            
        </View>
    )

}

EventsScreen.navigationOptions = {
    title: 'Events',
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
})
    
    

export default EventsScreen;