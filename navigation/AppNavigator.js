import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import RegisterForm from '../screens/Register';
import LoginForm from '../screens/Login';



const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginForm,
  },
  Register: {
    screen: RegisterForm,
  },

 
});

export default createAppContainer(AppNavigator);
