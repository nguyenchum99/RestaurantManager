
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
    BarChart  } from "react-native-chart-kit";


  export default class ChartMonth extends React.Component {

    constructor(props){
      super(props)
      this.itemRef= firebaseApp.database();
      this.state= {
        yearCurrent: '',
        totalMonth: [1,1,1,1,1,1,1,1,1,1,1,1],
        text: ''
      }
    }


    //get current time
    componentDidMount(){
    
      var year = new Date().getFullYear(); //Current Year

      this.setState( {
        yearCurrent: year
      })


      let temp = [];
      let total = 0;
     
      for(var i = 0; i < 12; i++){
          //var total = 0;
          total = 0;
          let month = Number(i) + 1;
          this.itemRef.ref('Orders').orderByChild('monthOrdered').equalTo(month)
          .on('value', (snapshot) => {

             console.log(snapshot)
              snapshot.forEach((child) => {
                console.log (child)
                total += Number(child.val().total);
              });
              // console.log(total)
              temp.push(total) 
              this.setState({totalMonth: temp}) 
            
            });
            console.log(total)
            // temp.push(total) 
            // this.setState({totalMonth: temp})  
             total = 0;
          //this.setState({totalMonth: temp})
        } 
     
    }

    render() {

     console.log("total months: " +this.state.totalMonth)
      return (
        <View style={styles.container}>
          <Text style = {styles.title}>Thống kê theo tháng</Text>
          
          <Text style = {styles.textTime}>Năm: {this.state.yearCurrent}</Text>
          <BarChart
            data={{
              labels: ["1", "2", "3", "4", "5", "6",
                      "7", "8", "9", "10", "11", "12"],
              datasets: [ {data: this.state.totalMonth
              }]
            }}

            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisSuffix="$"
            yAxisInterval={1} 
            chartConfig={chartConfig}
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
  

  const chartConfig = {
    backgroundGradientFrom: "#33adff",
   // backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#33adff",
  //  backgroundGradientToOpacity: 0.5,
    color: (opacity = 2) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };


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