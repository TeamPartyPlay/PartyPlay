import { createStackNavigator } from "react-navigation-stack"
import {HomeScreen, ProfileScreen} from '../views'
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthLoadingScreen from "../views/AuthLoading";
import LoginScreen from "../views/Login";

const AppStack = createStackNavigator({ Home: HomeScreen, Profile: ProfileScreen });
const AuthStack = createStackNavigator({ SignIn: LoginScreen });


const AuthSwitchNavigator = createAppContainer(
    createSwitchNavigator(
      {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
      },
      {
        initialRouteName: 'AuthLoading',
      }
    )
  );

const MainNavigator = createAppContainer(createStackNavigator({
    Home: {screen: HomeScreen},
    Profile: {screen: ProfileScreen},
}))

export default AuthSwitchNavigator;