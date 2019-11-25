import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { EventScreen, EventsScreen, HomeScreen, ProfileScreen } from "../views";

const ProfileStack = createStackNavigator({Profile: ProfileScreen});

const HomeStack = createStackNavigator({ Home: HomeScreen });
const EventStack = createStackNavigator({Events: EventsScreen, Event: EventScreen});

const AppStack = createBottomTabNavigator({Home: HomeStack, Events: EventStack, Profile: ProfileStack}, {initialRouteName:'Home'});

export default AppStack