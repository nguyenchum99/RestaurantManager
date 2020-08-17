import { StatusBar } from 'expo-status-bar';

import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import React, { Component } from 'react';
import ChartMonth from '../components/StatisticalMonth';
import SalesDay from '../components/StatisticalDay';
export default class HistoryManager extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let tabBarLabel = 'Thống kê';
    let tabBarIcon = () => (
      <Image
        source={require('../icons/icons8-activity-history-64.png')}
        style={{ width: 26, height: 26, tintColor: '#007256' }}
      />
    );
    return { tabBarLabel, tabBarIcon };
  };

  render() {
    return (
      <View style={styles.containerView}>
          <SalesDay></SalesDay>
          {/* <ChartMonth></ChartMonth> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
});
