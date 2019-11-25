// tslint:disable-next-line: object-literal-sort-keys
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import * as View from "../views";

const ProfileStack = createStackNavigator({Profile: View.ProfileScreen});

const ActivityStack = createStackNavigator({Activity: View.ActivityScreen});

const PlaylistStack = createStackNavigator({Playlist: View.PlaylistScreen});

const HomeStack = createStackNavigator({ Home: View.HomeScreen });
const EventStack = createStackNavigator({Events: View.EventsScreen, Event: View.EventScreen});
const MapStack = createStackNavigator({Map: View.MapScreen})

const AppStack = createBottomTabNavigator(
    {
        Events: EventStack,
        Map: MapStack, 
        Playlist: PlaylistStack,
        // tslint:disable-next-line: object-literal-sort-keys
        Activity: ActivityStack, 
        Profile: ProfileStack
    },
    {
        initialRouteName:'Events'
    }
);

export default AppStack