import { StatusBar } from 'expo-status-bar';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import React, { Component } from 'react';
import { firebaseApp } from '../components/FirebaseConfig';
import TabNavigator from '../navigation/TabNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {GoogleSignin} from 'react-native-google-signin'; 


export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onLoginPress = () => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        Alert.alert(
          'Alert Title',
          'Đăng nhập thành công: ' + this.state.email,
          [
            {
              text: 'Hủy',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => this.props.navigation.navigate('tab') },
          ],
          { cancelable: false }
        );

        this.setState({
          email: '',
          password: '',
        });
      })
      .catch(function (error) {
        Alert.alert(
          'Alert Title',
          'Đăng nhập lỗi ',
          [
            {
              text: 'Hủy',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        );
      });
  };

  checkEmail = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === false) {
      alert('Email is invalid');
    }
  };

  loginGoogle = () => {
    GoogleSignin.signIn()
    .then((data) => {
      const credential = firebaseApp.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
      return firebaseApp.auth().signInWithCredential(credential);

    }).then((currentUser) => {
      console.log(`Google login with user: ${JSON.stringify(currentUser.toJSON())}`)

    }).catch((error) => {
      console.log('Login fail')
    })
  }

  render() {
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
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
                returnKeyType="next"
                autoCorrect={false}
                onSubmitEditing={() => this.refs.txtPass.focus()}
              />
              <TextInput
                ref={'txtPass'}
                placeholder="Mật khẩu"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                secureTextEntry={true}
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
                returnKeyType="go"
              />

              <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onLoginPress()}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate('Register')}
              >
                <Text style={styles.buttonText}>Tạo tài khoản</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.loginGoogle()}
              >
                <Text style={styles.buttonText}>Login Google</Text>
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
    marginLeft: 20,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1,
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
    height: 45,
  },
  buttonText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#ffffff',
  },
});
