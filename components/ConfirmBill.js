import React, { Component } from 'react';
import { StyleSheet, View, ScrollView , Text} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { firebaseApp } from '../components/FirebaseConfig';

export default class ConfirmBill extends Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.state = {
      tableHead: ['STT', 'Tên món', 'Đơn giá ($)', 'Số lượng', 'Thành tiền ($)'],
      widthArr: [50, 120, 80, 60, 80],
      key: '',
      totalMoney: '',
      timeOrder: ''
    }
  }

  componentDidMount(){
    const key = this.props.navigation.getParam('key');
    const total = this.props.navigation.getParam('totalOrder');
    const time = this.props.navigation.getParam('time');
    this.setState({
     key: key,
     totalMoney: total,
     timeOrder: time
    });
  }
 
  render() {
    const state = this.state;
    const rowData = [];
    this.itemRef.ref(`Orders/${this.state.key}/orderList`).on('value', (snapshot) => {
        snapshot.forEach((child) => {
            rowData.push([
                Number(child.key) + 1,
                child.val().foodName,
                child.val().foodPrice,
                child.val().amount,
                Number(child.val().foodPrice) * Number( child.val().amount),
            ]
          );
         
        });
        console.log(rowData)
       
      });
    
    return (
        <View style={styles.container}>
        <Text style = {styles.title}>Hóa đơn</Text>
        <Text style = {styles.time}>Thời gian tạo: {this.state.timeOrder}</Text>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text} widthArr={state.widthArr} />
          <Rows data={rowData} textStyle={styles.text} widthArr={state.widthArr}/>
        </Table>
        
        <Text style = {styles.textMoney}>Tổng hóa đơn: {this.state.totalMoney} $</Text>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: {margin: 6},
    textMoney: {
        color: '#000000',
        fontSize: 15,
        marginTop: 30,
        marginLeft: 200
    },
        color: 'red',
        fontSize: 20,
        fontWeight:'normal',
        margin: 20
    },
    time: {
        marginLeft: 20,
        marginBottom: 20
    }
  });