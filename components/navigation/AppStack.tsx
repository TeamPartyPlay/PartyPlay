// tslint:disable-next-line: object-literal-sort-keys
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import * as View from "../views";

const IconComponent = Ionicons;

const Icons = {
    Profile: "contact",
    Activity: "notifications",
    Playlist: "musical-notes",
    Events: "calendar",
    Vote: "thumbs-up",
    Map: "map"
}

const ProfileStack = createStackNavigator({Profile: View.ProfileScreen});

const ActivityStack = createStackNavigator({Activity: View.ActivityScreen});

const PlaylistStack = createStackNavigator({Playlist: View.PlaylistScreen});

const EventStack = createStackNavigator({Events: View.EventsScreen, Event: View.EventScreen});

const VoteStack = createStackNavigator({Vote: View.VoteScreen})

const MapStack = createStackNavigator({Map: View.MapScreen})

const AppStack = createBottomTabNavigator(
    {
        Events: EventStack,
        Map: MapStack, 
        Playlist: PlaylistStack,
        Vote: VoteStack,
        // tslint:disable-next-line: object-literal-sort-keys
        Activity: ActivityStack, 
        Profile: ProfileStack
    },
    {
        defaultNavigationOptions: props => ({
            headerTitleStyle: {
                fontFamily: 'Roboto',
            },
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = props.navigation.state;
                return <IconComponent name={`md-${Icons[routeName]}`} size={25} color={focused ? 'blue' : 'black' } />
            },
        }),
        initialRouteName:'Events',

    }
);

export default AppStack