import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Calendars from '../components/Calendars';
import SalesDay from '../components/StatisticalDay';


const StackNavigator = createStackNavigator({
  'Lịch':  {
      screen: Calendars,
  },
  'Doanh số theo ngày': {
      screen: SalesDay
  },

 
});

export default createAppContainer(StackNavigator);
