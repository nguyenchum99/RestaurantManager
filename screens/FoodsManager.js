import { StyleSheet, Text, View, Image } from 'react-native';
import React, { Component, useState } from 'react';
import FlatListFoods from '../components/FlatListFoods';

export default class FoodsManager extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   const { params = {} } = navigation.state;
  //   let tabBarLabel = 'Đồ ăn';
  //   let tabBarIcon = () => (
  //     <Image
  //       source={require('../icons/icons8-restaurant-menu-64.png')}
  //       style={{ width: 26, height: 26, tintColor: '#007256' }}
  //     />
  //   );
  //   return { tabBarLabel, tabBarIcon };
  // };

  render() {
    return (
      <View style={styles.containerView}>
        {/* <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'blue' }}>Menu</Text> */}

        <FlatListFoods />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
});
