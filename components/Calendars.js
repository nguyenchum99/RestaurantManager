
import {
    StyleSheet,
    View,
    Text,
    ScrollView
  } from 'react-native';
  import React, { Component } from 'react';
  import {Calendar} from 'react-native-calendars';
  import DatePicker from 'react-native-datepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';


  export default class Calendars extends React.Component {
      constructor(props){
          super(props)
          this.state = {
              currentDay: new Date(),     
              selectDay: new Date(), 
             
          }
      }
      componentDidMount() {
        
         
      }

    render() {
      return (
        <View style={styles.container}>

          <View style = {styles.datePicker}>
            <Text style = {styles.title}>Thống kê theo khoảng thời gian</Text>
            <DatePicker
                    style={{width: 200}}
                    date={this.state.currentDay}
                    mode="date"
                    placeholder="Sau"
                    format="YYYY-M-DD"
                    minDate="2016-05-01"
                    maxDate="2021-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                        marginBottom: 20
                      },
                      dateInput: {
                        marginLeft: 50,
                        //marginBottom: 20
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                      this.setState({currentDay: date})
                      console.log('date picker'+ date.month)
                  
                    }}
                  
                  />

              <DatePicker
                    style={{width: 200}}
                    date={this.state.selectDay}
                    mode="date"
                    placeholder="Sau"
                    format="YYYY-M-DD"
                    minDate="2016-05-01"
                    maxDate="2021-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                       
                      },
                      dateInput: {
                        marginLeft: 50,
                        marginTop: 20
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                      this.setState({selectDay: date})
                  
                    }}
                  
                  />


              <TouchableOpacity style = {styles.button} onPress = {() => {
                  this.props.navigation.navigate('test', {
                    time1: this.state.currentDay,
                    time2: this.state.selectDay
                  })
              }}>
                <Text style = {styles.textButton}>Lọc</Text>
              </TouchableOpacity>

          </View>
         
            <Calendar
                current={Date()}
                minDate = {'2018-01-01'}
                maxDate = {'2021-12-30'}
                pastScrollRange={50}
                futureScrollRange={50}
                scrollEnabled={true}
                showScrollIndicator={false}

                //handle event click day
                onDayPress={(day) => {this.props.navigation.navigate('Doanh số theo ngày', {
                    time: day.year + '-' + day.month + '-' + day.day
                })}}
              
                monthFormat={"MMMM yyyy"}
                hideArrows={false}
                hideExtraDays={true}
                firstDay={1}
                hideDayNames={false}
                showWeekNumbers={false} 
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                disableArrowLeft={false}
              // Disable right arrow. Default = false
                disableArrowRight={false}
                theme={{
                    height: 300,
                    selectedDayBackgroundColor: '#42B5A0',
                    textDayFontSize: 15,
                    arrowColor: 'black',
                    monthTextColor: 'black',
                    textMonthFontSize: 25,
                    textDayHeaderFontSize: 14,
                    textSectionTitleColor: '#42B5A0',
                    agendaKnobColor: '#42B5A0',
                    agendaKnobSize: 12,
                   
                }}
                />
      </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff"
    },
    datePicker: {
      flexDirection: 'column',
      margin: 20
    },
    title: {
      color: 'red',
      fontSize: 15,
      margin: 10
    },
    button: {
      backgroundColor: '#3897f1',
      marginTop: 20,
      borderColor: '#3897f1',
      borderRadius: 10,
      textAlign: 'center',
      alignItems: 'center',
      marginBottom: 20,
      marginLeft: 50,
      width: 150
    },
    textButton: {
      color: '#ffffff',
      margin: 5
    },


  });