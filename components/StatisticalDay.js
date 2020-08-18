
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image
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
            tableHead: ['STT', 'Thời gian', 'Tổng tiền ($)'],
            widthArr: [50, 120, 80],
        }
      }
    
      componentDidMount() {
        this.itemRef.ref('Orders').on('value', (snapshot) => {
            var li = [];
            snapshot.forEach((child) => {
              li.push([
                Number(child.key) + 1,
                child.val().timeOrdered,
                child.val().total
              ]);
            });
            this.setState({ data: li });
          });
      }

    render() {
      return (
        <View style={styles.container}>
        <Text style = {styles.title}>Hóa đơn</Text>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} widthArr={this.state.widthArr} />
          <Rows data={this.state.data} textStyle={styles.text} widthArr={this.state.widthArr}/>
        </Table>
        
      </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff"
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