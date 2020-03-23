import faker from 'faker';
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
        <View style={styles.page}>
            <FlatList
                data={Array.from({length: 10}, (_, id)=>({
                    date: faker.date.future(),
                    image: faker.image.avatar(),
                    key: faker.name.findName(), 
                    location: faker.address.streetAddress(true), 
                }))}
                renderItem={({item}) => <EventListItem title={item.key} location={item.location} date={item.date} image={item.image}/>}
                keyExtractor={item => item.key}
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
    page: {
        backgroundColor: "#33333D"
    }
})
    
    

export default EventsScreen;