import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FlatListTables from '../components/FlatListTables';
import FlatListFoods from '../components/FlatListFoods';
import OrderFood from '../components/OrderFood';
import BillDetail from '../components/BIllDetail';
import ConfirmBill from '../components/ConfirmBill';

const StkNavgation = createStackNavigator({
  Order: {
      screen: FlatListTables
  },
  Menu: {
      screen: OrderFood
  },
  Bill: {
    screen: BillDetail
  },
  Confirm: {
    screen: ConfirmBill
  }
 
});

export default createAppContainer(StkNavgation);
