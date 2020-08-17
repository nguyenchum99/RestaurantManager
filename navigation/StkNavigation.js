import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FlatListTables from '../components/FlatListTables';
import OrderFood from '../components/OrderFood';
import BillDetail from '../components/BIllDetail';
import ConfirmBill from '../components/ConfirmBill';
import ShowBill from '../navigation/StackShow';


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
  },
  Show: {
    screen: ShowBill
  }
 
});

export default createAppContainer(StkNavgation);
