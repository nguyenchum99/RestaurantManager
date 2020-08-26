import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FlatListFoods from '../components/FlatListFoods';
import EditInfoFood from '../components/EditInfomationFood';


const StackFood = createStackNavigator({
  list: {
      screen: FlatListFoods,
  },
  edit: {
      screen: EditInfoFood
  },
});

export default createAppContainer(StackFood);
