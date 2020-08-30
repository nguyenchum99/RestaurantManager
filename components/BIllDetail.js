import { StyleSheet, View, Alert, ScrollView, Text, FlatList, Image, Modal } from 'react-native';
import React, { Component } from 'react';
import { firebaseApp } from '../components/FirebaseConfig';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { TextInput } from 'react-native-paper';
import AddAmountFood from './AddAmountFood';

export default class BillDetail extends React.Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.state = {
      orderDetails: {
        totalOrder: 0,
      },
      listFood: [],
      //totalOrder: 0,
      time: '',
      date: '',
      month: '',
      year: '',
      modalVisible: false,
      dataItemClick: {}
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  componentDidMount() {
    const orders = this.props.navigation.getParam('orderDetails');
    //console.log(orders)
    this.setState({
      orderDetails: orders,
      listFood: orders.orderList,
    });

    var total = 0;

    for (var i = 0; i < orders.orderList.length; i++) {
      total += Number(orders.orderList[i].foodPrice);
    }

    this.setState({ totalOrder: total });
    //time
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      //Setting the value of the date time
      time: hours + ':' + min + ':' + sec,
      date: year + '-' + month + '-' + date,
      month: month,
      year: year,
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
        {
          text: 'OK',
          onPress: () => {
            this.state.orderDetails.timeOrdered =
              new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
            this.state.orderDetails.dateOrdered = this.state.date;
            this.state.orderDetails.monthOrdered = this.state.month;
            this.state.orderDetails.yearOrdered = this.state.year;
            this.state.orderDetails.total = this.state.totalOrder;
            var keyOrder = this.itemRef.ref('Orders').push().key;

            console.log('delete food: ' + this.state.orderDetails);
            this.itemRef.ref(`Orders/${keyOrder}`).set(this.state.orderDetails).then().catch();

            this.props.navigation.navigate('Confirm', {
              key: keyOrder,
              totalOrder: this.state.totalOrder,
              time:
                new Date().getHours() +
                ':' +
                new Date().getMinutes() +
                ':' +
                new Date().getSeconds(),
              date: this.state.date,
            });
          },
        },
      ],
      { cancelable: false }
    );
  }

  handleOpenModal = (item) => {
    this.setState({
      modalVisible: true,
      dataItemClick: item
    })
  }

  handleCloseModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const {dataItemClick} = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Đặt số lượng</Text>
        <Text style={styles.textTotal}>Tổng tiền: {this.state.totalOrder} $</Text>
        <FlatList
          data={this.state.orderDetails.orderList}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.itemContent}>
                <View style={{ flexDirection: 'column' }}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log(index);
                      this.state.orderDetails.orderList.splice(index, 1);
                      this.setState({ orderDetails: this.state.orderDetails });
                    }}
                  >
                    <Image
                      style={styles.imageDelete}
                      source={require('../icons/icons8-delete-64.png')}
                    ></Image>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.itemCLick}
                  onPress={() => {
                    this.handleOpenModal(item)
                  }}
                >
                  <Image style={styles.imageFood} source={{ uri: item.foodImage }}></Image>
                  <View style={styles.textContent}>
                    <Text style={styles.nameFood}>{item.foodName}</Text>
                    <Text style={{ color: '#000000' }}>{item.foodPrice} $</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item) => item.foodKey}
          ref={'flatList'}
        />


        <AddAmountFood
          visible={this.state.modalVisible}
          ref={'openModal'}
          parentFlastList={this}
          onCloseModal={this.handleCloseModal}
          item={dataItemClick}
        ></AddAmountFood>

        <View style={styles.contentTotal}>
          <TouchableOpacity
            style={styles.clickConfirm}
            activeOpacity={0.5}
            onPress={() => this.confirmOrder()}
          >
            <Text style={styles.textConfirm}>Xác nhận</Text>
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
    color: '#000000',
  },
  itemCLick: {
    flexDirection: 'row',
    flex: 1,
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
      height: 2,
    },
    shadowColor: 'blue',
    shadowRadius: 2,
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
    marginTop: 20,
    height: 80,
    flexDirection: 'column',
  },
  nameFood: {
    fontSize: 15,
    color: '#3897f1',
    fontWeight: 'bold',
  },
  contentTotal: {
    marginTop: 30,
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
    marginLeft: 50,
  },
  textConfirm: {
    color: '#ffffff',
    margin: 5,
  },
  addAmount: {
    flexDirection: 'row',
    flex: 1,
  },
  imageDelete: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#3897f1',
    marginLeft: 20,
    marginTop: 15,
  },
  text: {
    fontSize: 15,
    color: '#3897f1',
    marginLeft: 20,
    marginTop: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
