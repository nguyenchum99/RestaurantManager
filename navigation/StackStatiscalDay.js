import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DatePicker from 'react-native-datepicker';
import AfterDay from '../components/StatisticalAfterDay';



const StackFood = createStackNavigator({
  picker: {
      screen: DatePicker,
  },
  after: {
      screen: AfterDay
  },
});

export default createAppContainer(StackFood);
