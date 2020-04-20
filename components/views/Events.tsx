import { Ionicons } from '@expo/vector-icons';
import faker from 'faker';
import React, { useState } from 'react';
import { Text, View, FlatList, StyleSheet, Alert, TouchableOpacity} from "react-native";
import { NavigationStackProp, NavigationStackScreenComponent  } from "react-navigation-stack";
import { EventListItem } from '../Event';
import ActionBarImage from '../navigation/ActionBarImage';
import Theme from '../providers/Theme';

const IconComponent = Ionicons;


// tslint:disable-next-line: interface-name
interface EventsScreenProps {
    navigation: NavigationStackProp<{name: string}>
}

const EventsScreen: NavigationStackScreenComponent<EventsScreenProps> = props => {
    const { navigate } = props.navigation;
    const [userLocation, setLocation] = useState<string>(null)
    navigator.geolocation.getCurrentPosition(
        position => {
            setLocation(JSON.stringify(position));
        },
        error => Alert.alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
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

EventsScreen.navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: <ActionBarImage/>,
    headerRight: () => (
        <TouchableOpacity style={styles.actionButton1} onPress={() => navigation.navigate('Event')}>
            <IconComponent name={`md-add`} style={styles.actionText1}/>
        </TouchableOpacity>
    ),
    headerStyle:{
        backgroundColor: Theme.colors.primary,
        height: 75,
    }
  })

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    actionButton1: {
        height: 36,
        width: '100%',
        // tslint:disable-next-line: object-literal-sort-keys
        padding: 8,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    actionText1: {
        color: "#29b473",
        opacity: 0.9,
        fontSize: 35
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    page: {
        backgroundColor: Theme.colors.primary,
    }
})
    
    

export default EventsScreen;