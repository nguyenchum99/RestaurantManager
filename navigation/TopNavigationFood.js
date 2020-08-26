
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import FlatListFoods from '../components/FlatListFoods';
import AddNewFood from '../components/AddNewFood';
import React, { Component } from 'react';
import {Image} from 'react-native';
import StackFood from './StackFood';


const TopNavigator = createMaterialTopTabNavigator(
    {
        ListFood: { 
            screen: StackFood,
            navigationOptions: {
                tabBarLabel:"Danh sách món ăn",
                tabBarIcon: ({ tintColor }) => (
                  <Image
                    source={require('../icons/icons8-spaghetti-48.png')}
                    style={{ width: 26, height: 26 }}
                  />
                )
              },
            
          },
        AddFood: { 
            screen: AddNewFood,
            navigationOptions: {
                tabBarLabel:"Tạo món ăn mới",
                tabBarIcon: ({ tintColor }) => (
                  <Image
                    source={require('../icons/icons8-cooker-64.png')}
                    style={{ width: 26, height: 26 }}
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
          fontSize: 10,
        }
      }
    }
  );

  
export default createAppContainer(TopNavigator);