import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Platform,
    ActivityIndicator,
    Button,
    Dimensions,
    Switch,
  } from 'react-native';
  import React, { Component } from 'react';
  import { firebaseApp } from './FirebaseConfig';
  import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
  import Modal from 'react-native-modalbox';
  
  var screen = Dimensions.get('window');


  export default class AddAmountFood extends React.Component {
    constructor(props) {
      super(props);
      this.itemRef = firebaseApp.database();
      this.state = {
        foodName: '',
        foodPrice: '',
        foodAmount: '',
        foodKey: ''
      };
    }
  
    showModal = (item) => {
      this.refs.myModal.open();
      this.setState({
          foodName: item.foodName,
          foodPrice: item.foodPrice,
          foodAmount: item.amount,
      })
    };
  
    
    //update db
    addAMountFood = () => { 
       item.amount = this.state.foodAmount;
       console.log(item)
    }

    render() {

      return (
        <Modal
          ref={'myModal'}
          style={{
            justifyContent: 'center',
            borderRadius: 10,
            shadowRadius: 10,
            width: screen.width - 80,
            height: 280,
          }}
          position="center"
          backdrop={true}
          onClosed={() => {}}
        >

        <Text style = {styles.textName}>{this.state.foodName}</Text>
        <Text style = {styles.text}>Đơn giá: {this.state.foodPrice} $</Text>
        <Text style = {styles.text}>Đặt số lượng</Text>

        <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(foodAmount) => this.setState({ foodAmount })}
            value={this.state.foodAmount}
        ></TextInput>
  
        <TouchableOpacity style = {styles.clickConfirm} onPress = {() => this.addAMountFood()}>
            <Text style = {styles.textConfirm}>Đặt</Text>
        </TouchableOpacity>
        </Modal>
      );
    }
  }
  
  const styles = StyleSheet.create({
    containerView: {
      width: 350,
      marginTop: 20,
      marginLeft: 30,
      height: 300,
    },
    input: {
      borderWidth: 1,
      borderColor: '#eaeaea',
      margin: 20,
      borderRadius: 10
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
    clickConfirm: {
        backgroundColor: '#3897f1',
        borderColor: '#3897f1',
        borderRadius: 10,
        textAlign: 'center',
        alignItems: 'center',
        margin: 20,
        
      },
      textConfirm: {
        color: '#ffffff',
        margin: 5
      }
  });
  