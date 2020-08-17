import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
   
  } from 'react-native';
  import React, { Component } from 'react';
  import { firebaseApp } from '../components/FirebaseConfig';
  import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
  
  export default class OrderFood extends React.Component {
    constructor(props) {
      super(props);
      this.itemRef = firebaseApp.database();
      this.state = {
       
        }   ; 
    }
  
    componentDidMount() {
      const name = this.props.navigation.getParam('nameTable');
      
    }
  
    render() {
      
      //var {amountOrder} = this.state.orderDetails.orderList.length; 
      return (
        <View style={styles.containerView}>
      
          <Text style={styles.title}> Menu </Text>
          <View
            style={{
              height: 50,
              backgroundColor: 'red',
              flexDirection: 'row',
            }}
          >
            <Image
              style={{
                width: 35,
                height: 35,
                marginTop: 10,
                marginLeft: 20,
              }}
              source={require('../icons/icons8-favorite-cart-100.png')}
            ></Image>
  
            <Text
              style={styles.cartView}>{this.state.amountOrder}</Text>
  
  
            <TouchableOpacity
              style={styles.clickView}
                onPress={() => {
                const { orderDetails } = this.state;
                this.props.navigation.navigate('Bill', {
                  orderDetails: this.state.orderDetails
                });
              }}
            >
              <Text style={{ color: '#ffffff', margin: 5 }}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    containerView: {
      flex: 1,
    },
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
      marginTop: 20,
      height: 80,
      flexDirection: 'column',
      flex: 1,   
    },
    nameFood: {
      fontSize: 15, color: '#3897f1', fontWeight: 'bold'
    },
    cartView: {
      color: '#ffffff',
      fontWeight: 'bold',
      height: 30,
      width: 30,
      marginTop: 20,
      marginLeft: 10,
    },
    clickView: {
      borderWidth: 1,
      borderColor: '#ffffff',
      borderRadius: 10,
      marginLeft: 150,
      marginTop: 10,   
    }
  });
  