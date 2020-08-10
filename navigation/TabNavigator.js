
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TablesManager from '../screens/TablesManager';
import FoodsManager from '../screens/FoodsManager';
import HistoryManager from '../screens/History';
import StkNavigation from './StkNavigation';



const TabNavigator = createBottomTabNavigator(
  {
    Tables: { 
      screen: StkNavigation
      
    },
    Foods: { 
      screen: FoodsManager

    },
    History: { 
      screen: HistoryManager
    }
  },
  { 
    tabBarOptions: { 
        showIcon: true,
        activeTintColor: '#D4AF37',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: 'white', 
        },
        labelStyle: {
        fontSize: 10,
      }
    }
  }
);


  export default createAppContainer(TabNavigator);
