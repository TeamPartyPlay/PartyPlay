// tslint:disable-next-line: object-literal-sort-keys
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import * as View from "../views";
import Theme from '../providers/Theme';

const IconComponent = Ionicons;

const Icons = {
    Profile: "contact",
    Activity: "notifications",
    Playlist: "musical-notes",
    Events: "calendar",
    Vote: "thumbs-up",
    Map: "map"
}

const ProfileStack = createStackNavigator({Profile: View.ProfileScreen}, {cardStyle: {backgroundColor: Theme.colors.primary}});

const ActivityStack = createStackNavigator({Activity: View.ActivityScreen}, {cardStyle: {backgroundColor: Theme.colors.primary}});

const PlaylistStack = createStackNavigator({Playlist: View.PlaylistScreen}, {cardStyle: {backgroundColor: Theme.colors.primary}});

const EventStack = createStackNavigator({Events: View.EventsScreen, Event: View.EventScreen}, {cardStyle: {backgroundColor: Theme.colors.primary}});

const VoteStack = createStackNavigator({Vote: View.VoteScreen}, {cardStyle: {backgroundColor: Theme.colors.primary}})

const MapStack = createStackNavigator({Map: View.MapScreen}, {cardStyle: {backgroundColor: Theme.colors.primary}})

const AppStack = createBottomTabNavigator(
    {
        Events: EventStack,
        //Map: MapStack, 
        Playlist: PlaylistStack,
        Vote: VoteStack,
        // tslint:disable-next-line: object-literal-sort-keys
        //Activity: ActivityStack, 
        Profile: ProfileStack
    },
    
    {
        defaultNavigationOptions: props => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = props.navigation.state;
                return <IconComponent name={`md-${Icons[routeName]}`} size={25} color={focused ? '#29b473' : 'white' } />
            },
            
        }),
        tabBarOptions: {
            activeTintColor: '#29b473',
            style: {
                backgroundColor: "#2d2d36",
                borderTopColor: 'transparent',
                paddingRight: 10,
                paddingLeft: 10,
            }
        },
        initialRouteName:'Events',

    }
);

export default AppStack