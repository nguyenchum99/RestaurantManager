
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    ScrollView
  } from 'react-native';
  import React, { Component } from 'react';
  import { firebaseApp } from './FirebaseConfig';
  import { Table, Row, Rows } from 'react-native-table-component';



  export default class AfterDay extends React.Component {

    constructor(props) {
        super(props);
        this.itemRef = firebaseApp.database();
        this.state = {
            data: [],
            tableHead: ['STT', 'Mã hóa đơn', 'Thời gian xuất hóa đơn ', 'Tổng tiền ($)'],
            widthArr: [50, 120,120, 80],
            time1: '',
            time2: '',
            totalDay: '',
           
        }  
      }
    
      componentDidMount() {
        const time1 = this.props.navigation.getParam('time1');
        const time2 = this.props.navigation.getParam('time2');
        this.setState({
            time1: time1,
            time2: time2})
        var total = 0;

        //read data and calculator total money day
        this.itemRef.ref('Orders').orderByChild('dateOrdered')
        .startAt(time1).endAt(time2).on('value', (snapshot) => {
            var li = [];
            var index = 0;
            snapshot.forEach((child) => {
              index = index + 1;    
                li.push([
                    index,
                    child.key,
                    child.val().dateOrdered + ' ' + child.val().timeOrdered ,
                    child.val().total
                ]);
                console.log('li' + li)

            });
          this.setState({ 
            data: li,
            });
        });
         
      }

    render() {
       console.log('data' + this.state.data)
      return (
        <View style={styles.container}>
          
          <Text style = {styles.title}>Thống kê hóa đơn từ ngày 
          {this.state.time1} đến ngày {this.state.time12}</Text>

          <Text style = {styles.textMoney}>Tổng hóa đơn: {this.state.totalDay} $</Text>
          <ScrollView style = {styles.table}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row data={this.state.tableHead} style={styles.head} 
              textStyle={styles.textHead} widthArr={this.state.widthArr} />
              <Rows data={this.state.data} textStyle={styles.text} widthArr={this.state.widthArr}/>
            </Table>
          </ScrollView>
          
      </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff"
    },
    table: {
      marginLeft: 20,
  
    },
    title :{
        color: '#3333cc',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20
    },
    textHead: {
      color: '#3333cc',
    },
    contentLayout: {
        flexDirection: 'row',
    },
    content: {
        flexDirection: 'row',
        margin:20
    },
    textTime: {
        color: '#000000',
        fontSize: 17,
        fontWeight: 'normal',
        marginLeft: 20,
        color: '#3897f1',
        marginBottom: 10
        
    },
    textMoney: {
        color: '#000000',
        fontSize: 15,
        fontWeight: 'normal',
        marginLeft: 20,
        color: '#3897f1',
        marginBottom: 10
    },
    time: {
        color: '#000000',
        fontSize: 15
    },
    money: {
        color: '#000000',
        fontSize: 15,
        marginLeft: 100
    }

  });