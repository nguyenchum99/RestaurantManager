
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image
  } from 'react-native';
  import React, { Component } from 'react';
  import { firebaseApp } from './FirebaseConfig';
  import {
    LineChart
  } from "react-native-chart-kit";


  export default class ChartMonth extends React.Component {

    constructor(props){
      super(props)
      this.state= {
        yearCurrent: '',
      }
    }


    //get current time
    componentDidMount(){
    
     var year = new Date().getFullYear(); //Current Year

     this.setState( {
       yearCurrent: year
     })
    
    }

    render() {
      return (
        <View style={styles.container}>
          <Text style = {styles.title}>Thống kê theo tháng</Text>
          <Text style = {styles.textTime}>Năm: {this.state.yearCurrent}</Text>
          <LineChart
            data={{
            labels: ["1", "2", "3", "4", "5", "6",
                    "7", "8", "9", "10", "11", "12"],
            datasets: [
              {
                data: [
                  10, 20, 13, 67, 23, 30, 10, 10 , 10, 10, 11, 12
                ]
              }
            ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisSuffix="$"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#99ccff",
              backgroundGradientFrom: "#99ccff",
              backgroundGradientTo: "#99ccff",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                  borderRadius: 16
              },
              propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#3399ff"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              marginLeft: 20,
              marginRight: 20
            }}
        />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff"
    },
    title: {
      color: '#4d94ff',
      fontSize: 20,
      fontWeight: 'bold'
    },
    textTime: {
      color: '#4d94ff',
      fontSize: 15

    }
  });