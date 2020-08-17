import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FlatListTables from '../components/FlatListTables';
import ConfirmBill from '../components/ConfirmBill';
                

const ShowBill = createStackNavigator({
  table: {
      screen: FlatListTables,
  },
  bill: {
      screen: ConfirmBill
  },

});

export default createAppContainer(ShowBill);
