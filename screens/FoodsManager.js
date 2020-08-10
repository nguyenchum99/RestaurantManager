

import { StyleSheet, Text, View, TextInput, 
  Button, KeyboardAvoidingView , TouchableWithoutFeedback, Keyboard, Alert, Image, Switch} from 'react-native';
import React, {Component, useState} from 'react';
import FlatListFoods from '../components/FlatListFoods';


export default class FoodsManager extends React.Component{

    static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      let tabBarLabel = 'Đồ ăn';
      let tabBarIcon = () => (
        <Image
          source={require('../icons/icons8-restaurant-menu-64.png')}
          style={{ width: 26, height: 26, tintColor: '#007256' }}
        />
      );
      return { tabBarLabel, tabBarIcon };
    }
 
  
    render(){


      return (
        <View style={styles.containerView}>
          <Text style = {{fontSize: 20, fontWeight : 'bold', color: 'blue'}}>Menu</Text>
          {/* <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          /> */}

          <FlatListFoods/>
          
        </View>     
      );
    }


}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
   
  },
 
});


