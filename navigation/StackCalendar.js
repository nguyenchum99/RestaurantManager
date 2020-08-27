import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Calendars from '../components/Calendars';
import SalesDay from '../components/StatisticalDay';
import AfterDay from '../components/StatisticalAfterDay';


const StackNavigator = createStackNavigator({
  'Lịch':  {
      screen: Calendars,
  },
  'Doanh số theo ngày': {
      screen: SalesDay
  },
  'test': {
    screen: AfterDay
  }
 
});

export default createAppContainer(StackNavigator);
