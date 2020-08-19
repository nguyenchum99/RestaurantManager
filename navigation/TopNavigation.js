
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import SalesDay from '../components/StatisticalDay';
import ChartMonth from '../components/StatisticalMonth';
import { createAppContainer } from 'react-navigation';
import React, { Component } from 'react';
import {Image} from 'react-native';
import Calendars from '../components/Calendars';
import StackCalendar from './StackCalendar';

const TopNavigator = createMaterialTopTabNavigator(
    {
        SaleDay: { 
            screen: StackCalendar,
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
              tabBarLabel:"Doanh thu của năm",
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