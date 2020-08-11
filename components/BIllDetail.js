import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import React, { Component } from 'react';
import { firebaseApp } from '../components/FirebaseConfig';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export default class BillDetail extends React.Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.state = {
      orderDetails: {
      },
    };
  }

  componentDidMount() {
    const orders = this.props.navigation.getParam('orderDetails');
    this.setState({
      orderDetails: orders
    });

   // console.log(this.state.orderDetails)
  }

  // confirm order, push data to firebase
  confirmOrder() {
    //alert("ban co muon")
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
          this.state.orderDetails.timeOrdered = new Date().toString();
          this.itemRef.ref('Orders').push({
            orderDetails: this.state.orderDetails
          });
      
          this.setState({
            orderDetails: ''
          })
        }
       },
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <View >
        <Text style={styles.title}>Hóa đơn</Text>

        <FlatList
          data={this.state.orderDetails.orderList}
          renderItem={({ item, index }) => {
            return (
             
              <View
                  style={styles.itemContent}
                >
                  <Image
                    style={styles.imageFood}
                    source={{ uri: item.foodImage }}
                  ></Image>

                  <View
                    style={styles.textContent}>
                    <Text style={styles.nameFood}>
                      {item.foodName}
                    </Text>
                    <Text style={{ color: '#000000' }}>{item.foodPrice} $</Text>
                    <Text style={{ color: '#000000' }}>{item.foodDescripton} </Text>
                  </View>
              </View>
                 
            );
          }}
          keyExtractor={(item) => item.foodKey}
          ref={'flatList'} 
        />

        <View style = {styles.contentTotal}>
          <Text style= {styles.textTotal}>Tổng tiền: 120 $</Text>
          <TouchableOpacity style = {styles.clickConfirm} onPress ={() => this.confirmOrder()}>
            <Text style = {styles.textConfirm}>Xác nhận</Text>
          </TouchableOpacity>
          
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({

  title: {
    fontWeight: 'bold', 
    fontSize: 15, 
    marginTop: 20, 
    marginLeft: 20, 
    color: '#000000'
  },
  itemContent: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  imageFood: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  textContent: {
    marginLeft: 10,
    marginTop: 10,
    height: 80,
    flexDirection: 'column',
    flex: 1,   
  },
  nameFood: {
    fontSize: 15, 
    color: '#3897f1', 
    fontWeight: 'bold'
  },
  contentTotal: {
    margin: 20
  },
  textTotal: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold'
  },
  clickConfirm: {
    backgroundColor: '#3897f1',
    marginTop: 15,
    borderColor: '#3897f1',
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center'
  },
  textConfirm: {
    color: '#ffffff',
    margin: 5
  }

});
