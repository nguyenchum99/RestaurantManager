
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import SalesDay from '../components/StatisticalDay';
import ChartMonth from '../components/StatisticalMonth';
import { createAppContainer } from 'react-navigation';
import React, { Component } from 'react';
import {Image} from 'react-native';

const TopNavigator = createMaterialTopTabNavigator(
    {
        SaleDay: { 
            screen: SalesDay,
            navigationOptions: {
              tabBarLabel:"Thống kê doanh số theo ngày",
              tabBarIcon: ({ tintColor }) => (
                <Image
                  source={require('../icons/icons8-profit-analysis-48.png')}
                  style={{ width: 26, height: 26 }}
                />
              )
            },
            
          },
        Month: { 
            screen: ChartMonth,
            navigationOptions: {
              tabBarLabel:"Doanh thu theo tháng",
              tabBarIcon: ({ tintColor }) => (
                <Image
                  source={require('../icons/icons8-combo-chart-48.png')}
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