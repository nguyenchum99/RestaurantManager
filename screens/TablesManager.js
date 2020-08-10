

import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View, TextInput, 
  Button, KeyboardAvoidingView , TouchableWithoutFeedback, Keyboard, Image} from 'react-native';
import React, {Component } from 'react';
import { createAppContainer } from 'react-navigation';
import FlatListTables from '../components/FlatListTables';

export default class TablesManager extends React.Component{

  //icon tab navigator
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let tabBarLabel = 'Bàn';
    let tabBarIcon = () => (
      <Image
        source={require('../icons/icons8-table-50.png')}
        style={{ width: 26, height: 26, tintColor: '#007256' }}
      />
    );
    return { tabBarLabel, tabBarIcon };
  }
  
    render(){
            return (

                <View style={styles.containerView}>

                  <FlatListTables></FlatListTables>
                
                </View>
              
            );
    }

}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
 
});


