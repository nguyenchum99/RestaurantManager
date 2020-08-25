import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  Text,
  FlatList,Image
} from 'react-native';
import React, { Component } from 'react';
import { firebaseApp } from '../components/FirebaseConfig';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { TextInput } from 'react-native-paper';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

export default class BillDetail extends React.Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.state = {
      orderDetails: {
        totalOrder: 0,
      },
      //totalOrder: 0,
      time: '',
      date: '',
      month: '',
      year: '',
    };
  }

  componentDidMount() {
    const orders = this.props.navigation.getParam('orderDetails');
    this.setState({
      orderDetails: orders,
      listFood: orders.orderList
    });
    
    var total = 0;
  
    for(var i = 0; i < orders.orderList.length; i ++){
       total += Number(orders.orderList[i].foodPrice)
    }

    this.setState({totalOrder: total})
    //time
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      //Setting the value of the date time
      time:
        hours + ':' + min + ':' + sec,
      date: 
        year + '-' + month + '-' + date,
      month: month,
      year: year
    });
  }


  // confirm order, push data to firebase
  confirmOrder() {
    //console.log(this.state.listFood)
      Alert.alert(
        'Alert Title',
        ' Xác nhận đặt món',
        [
          {
            text: 'Hủy',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => {
            this.state.orderDetails.timeOrdered = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
            this.state.orderDetails.dateOrdered = this.state.date;
            this.state.orderDetails.monthOrdered = this.state.month;
            this.state.orderDetails.yearOrdered = this.state.year;
            this.state.orderDetails.total = this.state.totalOrder;
            var keyOrder = this.itemRef.ref('Orders').push().key;

            this.itemRef.ref(`Orders/${keyOrder}`).set(this.state.orderDetails).then().catch();
            console.log(keyOrder)
           
            this.props.navigation.navigate('Confirm', {
                key: keyOrder,
                totalOrder: this.state.totalOrder,
                time: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
                date: this.state.date
            });

          }
        },
        ],
        { cancelable: false }
      );
  }

  minusAmount(amount) {
 
    amount = Number(amount) - 1;
  }

  render() {
  
    return (
      <View style = {styles.container} >
        <Text style={styles.title}>Đặt số lượng</Text>
        <Text style= {styles.textTotal}>Tổng tiền: {this.state.totalOrder} $</Text>
        <FlatList
          data={this.state.orderDetails.orderList}
          renderItem={({ item, index }) => {
            return (
             
              <View
                  style={styles.itemContent}
                >
                  <View style = {{flexDirection: 'column', }}>

                  <TouchableOpacity onPress = {(index) => {
                      this.state.orderDetails.orderList.splice(index, 1)
                      var money = Number(this.state.totalOrder) - Number(item.foodPrice)
                      this.setState({totalOrder: money})
                      //console.log(item)
                      this.setState({orderDetails: this.state.orderDetails})
                      
                      console.log(this.state.orderDetails.orderList)
                      this.props.navigation.goBack({
                        orderDetails : this.state.orderDetails
                      })
                  }}>
                      <Image
                        style={styles.imageDelete}
                        source={require('../icons/icons8-delete-64.png')}
                      ></Image>
                    </TouchableOpacity>

                    <Image
                      style={styles.imageFood}
                      source={{ uri: item.foodImage }}
                    ></Image>
                  </View>
                 

                  <View
                    style={styles.textContent}>
                      <Text style={styles.nameFood}>
                          {item.foodName}
                      </Text>
                      <Text style={{ color: '#000000' }}>{item.foodPrice} $</Text>
                   
                      <View style = {styles.addAmount}>
                        <Text>Số lượng: </Text>
                        {/* <TextInput 
                          placeholder = {item.amount}
                          placeholderColor="#c4c3cb"
                          onChangeText={(amount) => this.setState)}
                          //</View></View>/value={item.amount}
                        //  autoCorrect={false}
                          
                        ></TextInput> */}
                        {/* <TouchableOpacity onPress = {() => {this.minusAmount(item.amount, index)}}>
                            <Image style={{width: 30, height: 30}}
                              source = {require('../icons/icons8-minus-32.png/')}
                            ></Image>
                        </TouchableOpacity>
                        <Text style = {{color: '#000000', marginTop: 5, marginLeft: 10, marginRight: 10}}> {item.amount}</Text>
                        <TouchableOpacity onPress = {() => {this.setState({amount: Number(item.amount) - 1})}}>
                            <Image style={{width: 30, height: 30}}
                              source = {require('../icons/icons8-add-48.png')}
                            ></Image>
                        </TouchableOpacity> */}
                      </View>
                  
                  </View>
              </View>
                 
            );
          }}
          keyExtractor={(item) => item.foodKey}
          ref={'flatList'} 
        />

        <View style = {styles.contentTotal}>
          
          <TouchableOpacity style ={styles.clickConfirm} activeOpacity = {0.5} onPress ={() => this.confirmOrder()}>
            <Text style = {styles.textConfirm}>Xác nhận</Text>
          </TouchableOpacity>
          
        </View>
        
       </View>

    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },

  title: {
    fontWeight: 'bold', 
    fontSize: 15, 
    marginTop: 20, 
    marginLeft: 20, 
    color: '#000000'
  },
  itemContent: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    shadowOpacity: 0.8,
      shadowOffset: {
        width: 0,
        height: 2
    },
    shadowColor: 'blue',
    shadowRadius: 2
  },
  imageFood: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  textContent: {
    marginLeft: 10,
    marginTop: 40,
    height: 80,
    flexDirection: 'column',
  
  },
  nameFood: {
    fontSize: 15, 
    color: '#3897f1', 
    fontWeight: 'bold'
  },
  contentTotal: {
    marginTop: 30
  },
  textTotal: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  clickConfirm: {
    backgroundColor: '#3897f1',
    marginTop: 15,
    borderColor: '#3897f1',
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    marginLeft: 50
  },
  textConfirm: {
    color: '#ffffff',
    margin: 5
  },
  addAmount: {
    flexDirection: 'row'
  },
  imageDelete: {
    width: 30,
    height: 30,
    borderRadius: 15
  }

});
