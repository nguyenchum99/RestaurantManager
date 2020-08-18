

import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View, TextInput, 
  Button, KeyboardAvoidingView , TouchableWithoutFeedback, Keyboard, Image} from 'react-native';
import React, {Component } from 'react';
import { createAppContainer } from 'react-navigation';
import FlatListTables from '../components/FlatListTables';

export default class TablesManager extends React.Component{
  
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


