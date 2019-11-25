import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"
import { LoginScreen, SignUpScreen } from "../views";
import AuthLoadingScreen from "../views/AuthLoading";
import AppStack from "./AppStack";


const AuthStack = createStackNavigator({ SignIn: LoginScreen, SignUp: SignUpScreen });


const AuthSwitchNavigator = createAppContainer(
    createSwitchNavigator(
      {
        App: AppStack,
        Auth: AuthStack,
        AuthLoading: AuthLoadingScreen,

      },
      {
        initialRouteName: 'AuthLoading',
      }
    )
  );

export default AuthSwitchNavigator;