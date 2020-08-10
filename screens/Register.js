

import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View, TextInput, 
  Button, KeyboardAvoidingView , TouchableWithoutFeedback, Keyboard, Alert, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {firebaseApp} from '../components/FirebaseConfig';


export default class RegisterForm extends React.Component{

    constructor(props){
      super(props);
      this.state ={
        email: '',
        password: '',
        phone: ''
      }
    }


    //function register user
    registerUser(){
      firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).
      then(() =>{
        Alert.alert(
          "Alert Title",
          "Đăng ký thành công: " + this.state.email,
          [
            {
              text: "Hủy",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => this.props.navigation.navigate('Login') }
          ],
          { cancelable: false }
        )
        this.setState({
          email: '',
          password: '',
          phone: '',
        })
      })
      .catch(function(error) {
        Alert.alert(
          "Alert Title",
          "Đăng ký lỗi ",
          [
            {
              text: "Hủy",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        )
      });
    }
    render(){
            return (
              <KeyboardAvoidingView style={styles.containerView} behavior="padding">

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={styles.loginScreenContainer}>
                    <View style={styles.loginFormView}>
                    <Text style={styles.logoText}>Korea Food</Text>
                      <TextInput 
                        placeholder="Email" 
                        placeholderColor="#c4c3cb" 
                        style={styles.loginFormTextInput}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email} 
                        returnKeyType= 'next'
                        autoCorrect = {false}
                        onSubmitEditing= {() => this.refs.txtPass.focus()}
                        />

                      <TextInput 
                        ref = {'txtPass'}
                        placeholder="Mật khẩu" 
                        placeholderColor="#c4c3cb" 
                        style={styles.loginFormTextInput} 
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        returnKeyType= 'next'
                        autoCorrect = {false}
                        onSubmitEditing= {() => this.refs.txtPhone.focus()}/>

                      <TextInput 
                        ref = {'txtPhone'}
                        placeholder="Số điện thoại" 
                        placeholderColor="#c4c3cb" 
                        style={styles.loginFormTextInput}
                        onChangeText={(phone) => this.setState({phone})}
                        value={this.state.phone}
                        keyboardType = 'numeric'
                        returnKeyType= 'go' />
                      
                      <TouchableOpacity style = {styles.buttonContainer}  
                        onPress={() => this.registerUser()}>
                        <Text style={styles.buttonText}>Đăng ký</Text>
                      </TouchableOpacity>
                     
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            );
    }

}
const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
    width: 350,
    marginLeft: 20
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1
  },
  loginFormTextInput: {
    height: 50,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 5,
  
  },
  buttonContainer: {
    backgroundColor: '#3897f1',
    marginTop: 10,
    height: 45

  },
  buttonText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#ffffff',
   
  }
});

