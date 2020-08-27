
import {
    StyleSheet,
    View,
    Text,
    ScrollView
  } from 'react-native';
  import React, { Component } from 'react';

  import DatePicker from 'react-native-datepicker';


  export default class DatePicker extends React.Component {
      constructor(props){
          super(props)
          this.state = {
              currentDay: new Date(),
             
          }
      }

    render() {
      return (

        <DatePicker
                    style={{width: 200}}
                    date={this.state.currentDay}
                    mode="date"
                    placeholder="Sau"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate="2021-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 36
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                      this.setState({currentDay: date})
                      console.log('date picker' + date)
                  
                    }}
                  
                  />
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff"
    },
    datePicker: {
      flexDirection: 'row',
      margin: 20
    }

  });