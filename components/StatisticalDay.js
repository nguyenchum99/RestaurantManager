
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image
  } from 'react-native';
  import React, { Component } from 'react';
  import { firebaseApp } from './FirebaseConfig';
  
  export default class SalesDay extends React.Component {

    static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      let tabBarLabel = 'Thống kê doanh số theo ngày';
      let tabBarIcon = () => (
        <Image
          source={require('../icons/icons8-profit-analysis-48.png')}
          style={{ width: 26, height: 26 }}
        />
      );
      return { tabBarLabel, tabBarIcon };
    };

    constructor(props) {
        super(props);
        this.itemRef = firebaseApp.database();
        this.state = {
            data: []
        }
      }
    
      componentDidMount() {
        this.itemRef.ref('Orders').on('value', (snapshot) => {
            var li = [];
            snapshot.forEach((child) => {
              li.push({
                time: child.val().timeOrdered,
                total: child.val().total
              });
            });
            this.setState({ data: li });
          });
      }

    render() {
      return (
        <View style={styles.container}>
          <Text style = {styles.title}>Thống kê theo ngày</Text>
          <View style = {styles.contentLayout}>
              <Text style = {styles.textTime}>Thời gian xuất hóa đơn</Text>
              <Text style = {styles.textMoney}>Tổng tiền</Text>
          </View>
          <FlatList
          style={{ flex: 1 }}
          data={this.state.data}
          renderItem={({ item, index }) => {
            return (
                <View style = {styles.content}>
                    <Text style = {styles.time}>{item.time}</Text>
                    <Text style = {styles.money} >{item.total} $</Text>
                </View>
            )
          }}
          keyExtractor={(item) => item.key}
          ref={'flatList'}
          onContentSizeChange={() => this.refs.flatList.scrollToEnd()}
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