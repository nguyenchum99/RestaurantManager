import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AppNavigator from './AppNavigator';
import TabNavigator from './TabNavigator';
import StkNavigation from './StkNavigation';




const StackNavigator = createStackNavigator({
  stack: {
      screen: AppNavigator,
  },
  tab: {
      screen: TabNavigator
  },

 
});

export default createAppContainer(StackNavigator);
