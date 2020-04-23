import { Ionicons } from '@expo/vector-icons';
import faker from 'faker';
import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, Alert, TouchableOpacity, AsyncStorage} from "react-native";
import { NavigationStackProp, NavigationStackScreenComponent  } from "react-navigation-stack";
import { EventListItem } from '../Event';
import ActionBarImage from '../navigation/ActionBarImage';
import Theme from '../providers/Theme';
import { baseServerUrl } from '../../secret';
import { IEvent } from '../models/Event';

const IconComponent = Ionicons;

// tslint:disable-next-line: interface-name
interface EventsScreenProps {
    navigation: NavigationStackProp<{name: string}>
}

const EventsScreen: NavigationStackScreenComponent<EventsScreenProps> = props => {
    const [user, setUser] = useState(undefined);
    const { navigate } = props.navigation;
    const [events, setEvents] = useState<IEvent[]>();
    const [userLocation, setLocation] = useState<string>(null);

    const getUser = async () => {
        const userToken = await AsyncStorage.getItem("userToken");
        const res = await fetch(`${baseServerUrl}/api/user?token=${userToken}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        if(res.status === 200){
            const json = await res.json();
            setUser(json);
        }
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                setLocation(JSON.stringify(position));
            },
            error => Alert.alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        )
    }, [])

    useEffect(() => {
        // Get all events
        getUser();
        getEvents();
    }, []);

    const getEvents = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const res = await fetch(`${baseServerUrl}/api/event/all/?token=${userToken}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const json = await res.json();
            setEvents(json);
        } catch (error) {
            console.error(error)
        }
        
    }

    return(
        <View style={styles.page}>
            {events && (
                <FlatList
                    data={events}
                    renderItem={({item}) => <EventListItem event={item} image={faker.image.avatar()} user={user} />}
                    keyExtractor={item => item._id}
                />
            )}
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
    iconStyleText: {
      color: "#616161",
      fontSize: 50,
      paddingLeft: 8,
      width: 50,
      height: '100%'
    },
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
