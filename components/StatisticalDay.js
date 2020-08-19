
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



  export default class SalesDay extends React.Component {

    constructor(props) {
        super(props);
        this.itemRef = firebaseApp.database();
        this.state = {
            data: [],
            tableHead: ['STT', 'Mã hóa đơn', 'Thời gian xuất hóa đơn ', 'Tổng tiền ($)'],
            widthArr: [50, 120,120, 80],
            time: '',
        }
      }
    
      componentDidMount() {
        const time = this.props.navigation.getParam('time');
        this.setState({time: time})
        this.itemRef.ref('Orders').orderByChild('dateOrdered').equalTo(time).on('value', (snapshot) => {
            var li = [];
            var index = 0;
            snapshot.forEach((child) => {
              index = index + 1;
              li.push([
                index,
                child.key,
                child.val().timeOrdered,
                child.val().total
              ]);
            });
            this.setState({ data: li });
           // console.log(li)
          });
         
      }

    render() {
      return (
        <View style={styles.container}>
          <Text style = {styles.title}>Thống kê hóa đơn</Text>
          <Text style = {styles.textTime}>{this.state.time}</Text>
       
          <ScrollView style = {styles.table}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} widthArr={this.state.widthArr} />
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
        marginBottom: 20
        
    },
    textMoney: {
        color: '#000000',
        fontSize: 17,
        fontWeight: 'normal',
        marginLeft: 50,
        color: '#3897f1',
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