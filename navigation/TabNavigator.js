
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TablesManager from '../screens/TablesManager';
import FoodsManager from '../screens/FoodsManager';
import HistoryManager from '../screens/History';
import StkNavigation from './StkNavigation';
import TopNavigation from './TopNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {Image} from 'react-native';
import TopNavigationFood from './TopNavigationFood';


const TabNavigator = createBottomTabNavigator(  
  {
    'Bàn': { 
      screen: StkNavigation,
      navigationOptions: {
        tabBarLabel:"Bàn",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../icons/icons8-restaurant-table-48.png')}
            style={{ width: 30, height: 30 }}
          />
        )
      },
      
    },
    Foods: { 
      screen: TopNavigationFood,
      navigationOptions: {
        tabBarLabel:"Món ăn",
        tabBarIcon: ({ tintColor }) => (
          <Image
          source={require('../icons/icons8-tableware-48.png')}
          style={{ width: 30, height: 30 }}
        />
        )
      },

    },
    'Thống kê': { 
      screen: TopNavigation,
      navigationOptions: {
        tabBarLabel:"Thống kê",
        tabBarIcon: ({ tintColor }) => (
          <Image
              source={require('../icons/icons8-activity-history-64.png')}
              style={{ width: 30, height: 30 }}
            />
        )
      },
    }
  },
  {
    tabBarOptions: { 
        showIcon: true,
        activeTintColor: '#D4AF37',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: 'white', 
        },
        labelStyle: {
        fontSize: 12,
      }
    }
  }
  
);


  export default createAppContainer(TabNavigator);
