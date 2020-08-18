
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import SalesDay from '../components/StatisticalDay';
import ChartMonth from '../components/StatisticalMonth';
import { createAppContainer } from 'react-navigation';

const TopNavigator = createMaterialTopTabNavigator(
    {
        SaleDay: { 
            screen: SalesDay
            
          },
        Month: { 
            screen: ChartMonth
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

  
export default createAppContainer(TopNavigator);