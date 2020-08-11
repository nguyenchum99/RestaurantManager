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
  Image,
} from 'react-native';
import React, { Component } from 'react';

export default class HistoryManager extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let tabBarLabel = 'Lịch sử';
    let tabBarIcon = () => (
      <Image
        source={require('../icons/icons8-activity-history-64.png')}
        style={{ width: 26, height: 26, tintColor: '#007256' }}
      />
    );
    return { tabBarLabel, tabBarIcon };
  };

  render() {
    return <View style={styles.containerView}></View>;
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: 'red',
  },
});
