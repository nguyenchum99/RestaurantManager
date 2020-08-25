
import {
    StyleSheet,
    View,
    Text,
    ScrollView
  } from 'react-native';
  import React, { Component } from 'react';
  import {CalendarList} from 'react-native-calendars';



  export default class Calendars extends React.Component {
      constructor(props){
          super(props)
          this.state = {
              currentDay: new Date(),
             
          }
      }
      componentDidMount() {
        
         
      }

    render() {
      return (
        <View style={styles.container}>
        
            <CalendarList
                current={Date()}
                minDate = {'2018-01-01'}
                maxDate = {Date()}
                pastScrollRange={50}
                futureScrollRange={50}
                scrollEnabled={true}
                showScrollIndicator={false}

                //handle event click day
                onDayPress={(day) => {this.props.navigation.navigate('Doanh số theo ngày', {
                    time: day.year + '-' + day.month + '-' + day.day
                })}}

                monthFormat={"MMMM yyyy"}
                hideArrows={true}
                hideExtraDays={true}
                firstDay={1}
                hideDayNames={false}
                showWeekNumbers={false} 
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
    }
  });